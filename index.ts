import { checkDNS } from "./lib/dns";
import ip from "ip";

import { getArgs } from "./lib/cli.ts";

const { subnets } = getArgs();

if (subnets.length === 0) {
  console.error("No subnets provided.");
  process.exit(1);
}

const getAllHostsInSubnet = (subnet: string) => {
  const cidr = ip.cidrSubnet(subnet);

  return [...Array(cidr.numHosts)].map((_, i) => {
    const currentAddress = ip.toLong(cidr.firstAddress) + i;
    return ip.fromLong(currentAddress);
  });
};

//reduce the subnets down to a list of all hostnames to check
const allHosts = subnets.reduce<string[]>(
  (prev, curr) => [...prev, ...getAllHostsInSubnet(curr)],
  []
);

const dnsTestPromises = allHosts.map(async (host) => await checkDNS(host));

const results = await Promise.all(dnsTestPromises);

results.forEach(({ server, exitCode }) => {
  console.log(`${server}:${exitCode == 0 ? "FAIL" : "OK"}`);
});

process.exit(0);
