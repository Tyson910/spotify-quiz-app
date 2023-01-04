/**  @param {string} str */
function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.substring(1);
}

/**  @param {string} str */
function deSlugifyStr(str: string): string {
  // if string doesn't contain a '-' or '_' just return back the capitalized word
  if (!str.includes("-") && !str.includes("_")) {
    return capitalizeFirstLetter(str);
  }

  // replaces '-' or '_ with ' '
  const StrWithDashesAndHypensReplacedWithSpaces = str
    .replace(/-/g, "  ")
    .replace(/_/g, "  ");

  let deSlugifiedStr = "";
  StrWithDashesAndHypensReplacedWithSpaces.split(" ").forEach((char) => {
    deSlugifiedStr += char ? capitalizeFirstLetter(char) : " ";
  });
  return deSlugifiedStr;
}

/**
 * @param {string} str
 * @returns {string}
 */
function slugifyString(str: string): string {
  return (
    str?.trim()
      //Remove all characters except alpha characters and spaces
      ?.replace(/[^\w\s]/gi, "")
      //replace all spaces with -
      ?.replace(/[^a-z]/gi, "-")
      ?.toLowerCase()
  );
}

export { deSlugifyStr, slugifyString };
