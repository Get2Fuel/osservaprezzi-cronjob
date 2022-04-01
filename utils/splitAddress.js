const splitLegacyAddress = (legacyAddress) => {
  const [addressAndZip, townAndProvince] = legacyAddress.split(" - ", 2);
  return [addressAndZip.trim(), townAndProvince.trim()];
};

const splitAddressAndZip = (addressAndZip) => {
  const splitAddressAndZip = addressAndZip.split(" ");
  const length = splitAddressAndZip.length;
  if (
    !isNaN(+splitAddressAndZip[length - 1]) &&
    splitAddressAndZip[length - 1].length === 5
  ) {
    const address = splitAddressAndZip
      .slice(0, length - 1)
      .join(" ")
      .trim();
    const zip = +splitAddressAndZip[length - 1];
    return [address, zip];
  }
  const address = splitAddressAndZip.join(" ").trim();
  return [address, undefined];
};

const splitTownAndProvince = (townAndProvince) => {
  const splitTownAndProvince = townAndProvince.split(" ");
  const length = splitTownAndProvince.length;
  const town = splitTownAndProvince
    .slice(0, length - 1)
    .join(" ")
    .trim();
  const province = splitTownAndProvince[length - 1];
  return [town, province];
};

const splitAddress = (addr) => {
  const [addressAndZip, townAndProvince] = splitLegacyAddress(addr);

  const [address, zip] = splitAddressAndZip(addressAndZip);

  const [town, province] = splitTownAndProvince(townAndProvince);

  return [address, zip, town, province];
};

export default splitAddress;
