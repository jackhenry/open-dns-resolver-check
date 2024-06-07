export async function checkDNS(server: String) {
  const dnsCheckPath = Bun.env.DNS_CHECK_PATH as string;
  const proc = Bun.spawn([dnsCheckPath, "-H", "tekwerks.com", "-s", server]);

  const response = await new Response(proc.stdout).text();
  const exitCode = await proc.exited;
  return {
    server,
    exitCode,
    response,
  };
}
