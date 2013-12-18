export function enableVendorPrefixedObject(obj: Object, propertyName: string) {
    if (obj[propertyName] != null)
        return;
    var list = ['moz', 'webkit', 'khtml', 'o', 'ms'];
    for (var i = 0, len = list.length; i < len; i++) {
        var prefix = list[i];
        var vendorPropertyName = prefix + propertyName.charAt(0).toUpperCase()
            + propertyName.substring(1);
        if (obj[vendorPropertyName] != null) {
            obj[propertyName] = obj[vendorPropertyName];
            return;
        }
    }
    throw Error(propertyName + 'is not found.');
}
