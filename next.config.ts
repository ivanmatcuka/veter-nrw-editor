import createNextIntlPlugin from "next-intl/plugin";
import { createSecureHeaders } from "next-secure-headers";
const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  async headers() {
    return [
      {
        source: "/:path*",
        headers: createSecureHeaders({
          xssProtection: false,
        }),
      },
    ];
  },
});
