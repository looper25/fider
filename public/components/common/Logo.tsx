import * as React from "react";
import { Fider, uploadedImageURL } from "@fider/services";

type Size = 24 | 50 | 100 | 200;

interface TenantLogoProps {
  size: Size;
}

export const TenantLogoURL = (size: Size): string | undefined => {
  const tenant = Fider.session.tenant;
  if (tenant && tenant.logoID > 0) {
    return uploadedImageURL(tenant.logoID, size);
  }
  return undefined;
};

export const TenantLogo = (props: TenantLogoProps) => {
  const tenant = Fider.session.tenant;
  if (tenant && tenant.logoID > 0) {
    return <img src={TenantLogoURL(props.size)} alt={tenant.name} />;
  }
  return null;
};

interface OAuthProviderLogoProps {
  option: {
    provider?: string;
    displayName: string;
    logoID?: number;
  };
}

const systemProvidersLogo: { [key: string]: string } = {
  google: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkMxMDc7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzMy42NTIzNDQgMzIuNjU2MjUgMjkuMjIyNjU2IDM2IDI0IDM2IEMgMTcuMzcxMDk0IDM2IDEyIDMwLjYyODkwNiAxMiAyNCBDIDEyIDE3LjM3MTA5NCAxNy4zNzEwOTQgMTIgMjQgMTIgQyAyNy4wNTg1OTQgMTIgMjkuODQzNzUgMTMuMTUyMzQ0IDMxLjk2MDkzOCAxNS4wMzkwNjMgTCAzNy42MTcxODggOS4zODI4MTMgQyAzNC4wNDY4NzUgNi4wNTQ2ODggMjkuMjY5NTMxIDQgMjQgNCBDIDEyLjk1MzEyNSA0IDQgMTIuOTUzMTI1IDQgMjQgQyA0IDM1LjA0Njg3NSAxMi45NTMxMjUgNDQgMjQgNDQgQyAzNS4wNDY4NzUgNDQgNDQgMzUuMDQ2ODc1IDQ0IDI0IEMgNDQgMjIuNjYwMTU2IDQzLjg2MzI4MSAyMS4zNTE1NjMgNDMuNjA5Mzc1IDIwLjA4MjAzMSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkYzRDAwOyIgZD0iTSA2LjMwNDY4OCAxNC42OTE0MDYgTCAxMi44Nzg5MDYgMTkuNTExNzE5IEMgMTQuNjU2MjUgMTUuMTA5Mzc1IDE4Ljk2MDkzOCAxMiAyNCAxMiBDIDI3LjA1ODU5NCAxMiAyOS44NDM3NSAxMy4xNTIzNDQgMzEuOTYwOTM4IDE1LjAzOTA2MyBMIDM3LjYxNzE4OCA5LjM4MjgxMyBDIDM0LjA0Njg3NSA2LjA1NDY4OCAyOS4yNjk1MzEgNCAyNCA0IEMgMTYuMzE2NDA2IDQgOS42NTYyNSA4LjMzNTkzOCA2LjMwNDY4OCAxNC42OTE0MDYgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzRDQUY1MDsiIGQ9Ik0gMjQgNDQgQyAyOS4xNjQwNjMgNDQgMzMuODU5Mzc1IDQyLjAyMzQzOCAzNy40MTAxNTYgMzguODA4NTk0IEwgMzEuMjE4NzUgMzMuNTcwMzEzIEMgMjkuMjEwOTM4IDM1LjA4OTg0NCAyNi43MTQ4NDQgMzYgMjQgMzYgQyAxOC43OTY4NzUgMzYgMTQuMzgyODEzIDMyLjY4MzU5NCAxMi43MTg3NSAyOC4wNTQ2ODggTCA2LjE5NTMxMyAzMy4wNzgxMjUgQyA5LjUwMzkwNiAzOS41NTQ2ODggMTYuMjI2NTYzIDQ0IDI0IDQ0IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMxOTc2RDI7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzNC41MTE3MTkgMzAuMjM4MjgxIDMzLjA3MDMxMyAzMi4xNjQwNjMgMzEuMjE0ODQ0IDMzLjU3MDMxMyBDIDMxLjIxODc1IDMzLjU3MDMxMyAzMS4yMTg3NSAzMy41NzAzMTMgMzEuMjE4NzUgMzMuNTcwMzEzIEwgMzcuNDEwMTU2IDM4LjgwODU5NCBDIDM2Ljk3MjY1NiAzOS4yMDMxMjUgNDQgMzQgNDQgMjQgQyA0NCAyMi42NjAxNTYgNDMuODYzMjgxIDIxLjM1MTU2MyA0My42MDkzNzUgMjAuMDgyMDMxIFogIj48L3BhdGg+PC9nPjwvc3ZnPg==`,
  facebook: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiMzRjUxQjU7IiBkPSJNIDQyIDM3IEMgNDIgMzkuNzYxNzE5IDM5Ljc2MTcxOSA0MiAzNyA0MiBMIDExIDQyIEMgOC4yMzgyODEgNDIgNiAzOS43NjE3MTkgNiAzNyBMIDYgMTEgQyA2IDguMjM4MjgxIDguMjM4MjgxIDYgMTEgNiBMIDM3IDYgQyAzOS43NjE3MTkgNiA0MiA4LjIzODI4MSA0MiAxMSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZGRkZGOyIgZD0iTSAzNC4zNjcxODggMjUgTCAzMSAyNSBMIDMxIDM4IEwgMjYgMzggTCAyNiAyNSBMIDIzIDI1IEwgMjMgMjEgTCAyNiAyMSBMIDI2IDE4LjU4OTg0NCBDIDI2LjAwMzkwNiAxNS4wODIwMzEgMjcuNDYwOTM4IDEzIDMxLjU5Mzc1IDEzIEwgMzUgMTMgTCAzNSAxNyBMIDMyLjcxNDg0NCAxNyBDIDMxLjEwNTQ2OSAxNyAzMSAxNy42MDE1NjMgMzEgMTguNzIyNjU2IEwgMzEgMjEgTCAzNSAyMSBaICI+PC9wYXRoPjwvZz48L3N2Zz4=`,
  github:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIKICAgICB2aWV3Qm94PSIwIDAgMzIgMzIiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsLXJ1bGU6ZXZlbm9kZDsiIGQ9Ik0gMTYgNCBDIDkuMzcxMDk0IDQgNCA5LjM3MTA5NCA0IDE2IEMgNCAyMS4zMDA3ODEgNy40Mzc1IDI1LjgwMDc4MSAxMi4yMDcwMzEgMjcuMzg2NzE5IEMgMTIuODA4NTk0IDI3LjQ5NjA5NCAxMy4wMjczNDQgMjcuMTI4OTA2IDEzLjAyNzM0NCAyNi44MDg1OTQgQyAxMy4wMjczNDQgMjYuNTIzNDM4IDEzLjAxNTYyNSAyNS43Njk1MzEgMTMuMDExNzE5IDI0Ljc2OTUzMSBDIDkuNjcxODc1IDI1LjQ5MjE4OCA4Ljk2ODc1IDIzLjE2MDE1NiA4Ljk2ODc1IDIzLjE2MDE1NiBDIDguNDIxODc1IDIxLjc3MzQzOCA3LjYzNjcxOSAyMS40MDIzNDQgNy42MzY3MTkgMjEuNDAyMzQ0IEMgNi41NDY4NzUgMjAuNjYwMTU2IDcuNzE4NzUgMjAuNjc1NzgxIDcuNzE4NzUgMjAuNjc1NzgxIEMgOC45MjE4NzUgMjAuNzYxNzE5IDkuNTU0Njg4IDIxLjkxMDE1NiA5LjU1NDY4OCAyMS45MTAxNTYgQyAxMC42MjUgMjMuNzQ2MDk0IDEyLjM2MzI4MSAyMy4yMTQ4NDQgMTMuMDQ2ODc1IDIyLjkxMDE1NiBDIDEzLjE1NjI1IDIyLjEzMjgxMyAxMy40Njg3NSAyMS42MDU0NjkgMTMuODA4NTk0IDIxLjMwNDY4OCBDIDExLjE0NDUzMSAyMS4wMDM5MDYgOC4zNDM3NSAxOS45NzI2NTYgOC4zNDM3NSAxNS4zNzUgQyA4LjM0Mzc1IDE0LjA2MjUgOC44MTI1IDEyLjk5MjE4OCA5LjU3ODEyNSAxMi4xNTIzNDQgQyA5LjQ1NzAzMSAxMS44NTE1NjMgOS4wNDI5NjkgMTAuNjI4OTA2IDkuNjk1MzEzIDguOTc2NTYzIEMgOS42OTUzMTMgOC45NzY1NjMgMTAuNzAzMTI1IDguNjU2MjUgMTIuOTk2MDk0IDEwLjIwNzAzMSBDIDEzLjk1MzEyNSA5Ljk0MTQwNiAxNC45ODA0NjkgOS44MDg1OTQgMTYgOS44MDQ2ODggQyAxNy4wMTk1MzEgOS44MDg1OTQgMTguMDQ2ODc1IDkuOTQxNDA2IDE5LjAwMzkwNiAxMC4yMDcwMzEgQyAyMS4yOTY4NzUgOC42NTYyNSAyMi4zMDA3ODEgOC45NzY1NjMgMjIuMzAwNzgxIDguOTc2NTYzIEMgMjIuOTU3MDMxIDEwLjYyODkwNiAyMi41NDY4NzUgMTEuODUxNTYzIDIyLjQyMTg3NSAxMi4xNTIzNDQgQyAyMy4xOTE0MDYgMTIuOTkyMTg4IDIzLjY1MjM0NCAxNC4wNjI1IDIzLjY1MjM0NCAxNS4zNzUgQyAyMy42NTIzNDQgMTkuOTg0Mzc1IDIwLjg0NzY1NiAyMC45OTYwOTQgMTguMTc1NzgxIDIxLjI5Njg3NSBDIDE4LjYwNTQ2OSAyMS42NjQwNjMgMTguOTg4MjgxIDIyLjM5ODQzOCAxOC45ODgyODEgMjMuNTE1NjI1IEMgMTguOTg4MjgxIDI1LjEyMTA5NCAxOC45NzY1NjMgMjYuNDE0MDYzIDE4Ljk3NjU2MyAyNi44MDg1OTQgQyAxOC45NzY1NjMgMjcuMTI4OTA2IDE5LjE5MTQwNiAyNy41MDM5MDYgMTkuODAwNzgxIDI3LjM4NjcxOSBDIDI0LjU2NjQwNiAyNS43OTY4NzUgMjggMjEuMzAwNzgxIDI4IDE2IEMgMjggOS4zNzEwOTQgMjIuNjI4OTA2IDQgMTYgNCBaICI+PC9wYXRoPjwvZz48L3N2Zz4="
};

export const OAuthProviderLogoURL = (id?: number): string | undefined => {
  if (id && id > 0) {
    return uploadedImageURL(id, 100);
  }
  return undefined;
};

export const OAuthProviderLogo = (props: OAuthProviderLogoProps) => {
  if (props.option.logoID && props.option.logoID > 0) {
    return <img src={OAuthProviderLogoURL(props.option.logoID)} alt={props.option.displayName} />;
  }

  if (props.option.provider && props.option.provider in systemProvidersLogo) {
    return <img src={systemProvidersLogo[props.option.provider]} alt={props.option.displayName} />;
  }

  return null;
};
