# open-dns-resolver-check

## Quickstart

Pull the repository and build the docker image

```
git clone https://github.com/jackhenry/open-dns-resolver-check.git
cd open-dns-resolver-check
docker build -t open-dns-resolver-check .
```

Run the check by providing a list of subnets as arguments

```
docker run -it --rm open-dns-resolver-check 8.8.8.0/24
```
