package main

import (
	"net/http"

	"strings"

	"github.com/WeCanHearYou/wechy/app"
	"github.com/WeCanHearYou/wechy/app/feedback"
	"github.com/WeCanHearYou/wechy/app/identity"
	"github.com/WeCanHearYou/wechy/app/infra"
	"github.com/WeCanHearYou/wechy/app/toolbox/env"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
)

// WechyServices holds reference to all Wechy services
type WechyServices struct {
	OAuth    identity.OAuthService
	User     identity.UserService
	Tenant   identity.TenantService
	Idea     feedback.IdeaService
	Health   infra.HealthCheckService
	Settings *infra.WechySettings
}

func errorHandler(e error, c echo.Context) {
	if strings.Contains(e.Error(), "code=404") {
		c.Logger().Debug(e)
		c.Render(http.StatusNotFound, "404.html", echo.Map{})
	} else {
		c.Logger().Error(e)
		c.Render(http.StatusInternalServerError, "500.html", echo.Map{})
	}
}

func createLogger() echo.Logger {
	logger := log.New("")
	logger.SetHeader(`${level} [${time_rfc3339}]`)

	if env.IsProduction() {
		logger.SetLevel(log.INFO)
	} else {
		logger.SetLevel(log.DEBUG)
	}

	return logger
}

func wrapFunc(handler app.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := app.Context{Context: c}
		return handler(ctx)
	}
}

func wrapMiddleware(mw app.MiddlewareFunc) echo.MiddlewareFunc {
	return func(h echo.HandlerFunc) echo.HandlerFunc {
		return wrapFunc(mw(func(c app.Context) error {
			return h(c)
		}))
	}
}

func get(group *echo.Group, path string, handler app.HandlerFunc) {
	group.GET(path, wrapFunc(handler))
}

func post(group *echo.Group, path string, handler app.HandlerFunc) {
	group.POST(path, wrapFunc(handler))
}

func use(group *echo.Group, mw app.MiddlewareFunc) {
	group.Use(wrapMiddleware(mw))
}

func group(router *echo.Echo, name string, middlewares ...app.MiddlewareFunc) *echo.Group {
	var mw []echo.MiddlewareFunc
	for _, m := range middlewares {
		mw = append(mw, wrapMiddleware(m))
	}
	return router.Group(name, mw...)
}

// GetMainEngine returns main HTTP engine
func GetMainEngine(ctx *WechyServices) *echo.Echo {
	router := echo.New()

	router.Logger = createLogger()
	router.Renderer = app.NewHTMLRenderer(router.Logger)
	router.HTTPErrorHandler = errorHandler

	router.Use(middleware.Gzip())
	router.Static("/favicon.ico", "favicon.ico")
	assetsGroup := group(router, "/assets", app.OneYearCache())
	{
		assetsGroup.Static("/", "dist")
	}

	oauthHandlers := identity.OAuth(ctx.Tenant, ctx.OAuth, ctx.User)
	authGroup := group(router, "/oauth", infra.HostChecker(env.MustGet("AUTH_ENDPOINT")))
	{
		get(authGroup, "/facebook", oauthHandlers.Login(identity.OAuthFacebookProvider))
		get(authGroup, "/facebook/callback", oauthHandlers.Callback(identity.OAuthFacebookProvider))
		get(authGroup, "/google", oauthHandlers.Login(identity.OAuthGoogleProvider))
		get(authGroup, "/google/callback", oauthHandlers.Callback(identity.OAuthGoogleProvider))
	}

	appGroup := group(router, "")
	{
		use(appGroup, infra.JwtGetter())
		use(appGroup, infra.JwtSetter())
		use(appGroup, identity.MultiTenant(ctx.Tenant))

		get(appGroup, "/", feedback.Handlers(ctx.Idea).List())
		get(appGroup, "/ideas/:id", feedback.Handlers(ctx.Idea).Details())
		get(appGroup, "/logout", oauthHandlers.Logout())
		get(appGroup, "/api/status", infra.Status(ctx.Health, ctx.Settings))
	}

	securedGroup := group(router, "")
	{
		use(securedGroup, infra.IsAuthenticated())
		use(securedGroup, infra.JwtGetter())
		use(securedGroup, infra.JwtSetter())
		use(securedGroup, identity.MultiTenant(ctx.Tenant))

		post(securedGroup, "/api/ideas", feedback.Handlers(ctx.Idea).PostIdea())
		post(securedGroup, "/api/ideas/:id/comments", feedback.Handlers(ctx.Idea).PostComment())
	}

	return router
}