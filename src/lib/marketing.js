const MARKETING_PARAMS = [
  "utm_source",
  "utm_sub_source",
  "utm_medium",
  "campaigncode",
  "campaignname",
  "utm_campaignname",
  "utm_campaign",
  "campaignid",
  "utm_campaignid",
  "gad_campaignid",
  "adgroupname",
  "utm_adgroupname",
  "utm_adset",
  "adgroupid",
  "utm_adgroupid",
  "adname",
  "utm_adname",
  "utm_adcreative",
  "creative",
  "Lead_Keyword",
  "keyword",
  "utm_term",
  "Lead_Placement",
  "placement",
  "Lead_Device",
  "device",
  "gad_source",
  "gbraid",
  "wbraid",
  "gclid",
  "adId",
  "utm_adid"
];

function isSet(value) {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
  );
}

function setCookie(name, value, days = 30) {
  const date = new Date();

  date.setTime(
    date.getTime() +
      days * 24 * 60 * 60 * 1000
  );

  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}` +
    `; expires=${date.toUTCString()}` +
    `; path=/` +
    `; SameSite=Lax`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");

  const prefix =
    `${encodeURIComponent(name)}=`;

  const cookie = cookies.find((item) =>
    item.startsWith(prefix)
  );

  if (!cookie) {
    return "";
  }

  return decodeURIComponent(
    cookie.substring(prefix.length)
  );
}

function deleteCookie(name) {
  document.cookie =
    `${encodeURIComponent(name)}=` +
    `; expires=Thu, 01 Jan 1970 00:00:00 GMT` +
    `; path=/`;
}

export function captureMarketingParams() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);

  MARKETING_PARAMS.forEach((key) => {
    const value = params.get(key);

    if (isSet(value)) {
      setCookie(key, value, 30);
    }
  });

  return getNormalizedMarketingData();
}

export function getMarketingData() {
  const data = {};

  MARKETING_PARAMS.forEach((key) => {
    const value = getCookie(key);

    if (isSet(value)) {
      data[key] = value;
    }
  });

  return data;
}

export function getNormalizedMarketingData() {
  const raw = getMarketingData();

  const campaignName =
    raw.utm_campaignname ||
    raw.campaignname ||
    raw.utm_campaign ||
    "";

  const campaignId =
    raw.utm_campaignid ||
    raw.gad_campaignid ||
    raw.campaignid ||
    "";

  const adGroupName =
    raw.utm_adgroupname ||
    raw.utm_adset ||
    raw.adgroupname ||
    "";

  const adGroupId =
    raw.utm_adgroupid ||
    raw.adgroupid ||
    "";

  const adCreative =
    raw.utm_adname ||
    raw.utm_adcreative ||
    raw.creative ||
    raw.adname ||
    "";

  const keyword =
    raw.Lead_Keyword ||
    raw.keyword ||
    raw.utm_term ||
    "";

  const placement =
    raw.Lead_Placement ||
    raw.placement ||
    "";

  const device =
    raw.Lead_Device ||
    raw.device ||
    "";

    const adId =
      raw.utm_adid ||
      raw.adId ||
      "";

  return {
    ...raw,
    utm_source: raw.utm_source || "",
    utm_sub_source: raw.utm_sub_source || "",
    utm_medium: raw.utm_medium || "",
    campaigncode: raw.campaigncode || "",
    campaignname: campaignName,
    utm_campaignname: campaignName,
    campaignid: campaignId,
    utm_campaignid: campaignId,
    gad_campaignid: campaignId,
    utm_adset: adGroupName,
    utm_adgroupname: adGroupName,
    adgroupname: adGroupName,
    utm_adgroupid: adGroupId,
    adgroupid: adGroupId,
    utm_adname: adCreative,
    utm_adcreative: adCreative,
    Lead_Keyword: keyword,
    keyword: keyword,
    Lead_Placement: placement,
    placement: placement,
    Lead_Device: device,
    device: device,
    gad_source: raw.gad_source || "",
    gbraid: raw.gbraid || raw.wbraid || "",
    gclid: raw.gclid || "",
    utm_adid: adId,
    adId: adId
  };
}

export function clearMarketingData() {
  MARKETING_PARAMS.forEach((key) => {
    deleteCookie(key);
  });
}