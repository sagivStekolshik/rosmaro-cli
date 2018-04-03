String.prototype.capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)


String.prototype.toCamelCase = notCamelized => notCamelized.split(" ").map((item, index) => index === 0 ? item.toLowerCase() : capitalize(item)).join('')

