function ResolveDataType(datatypeName) {
    switch (datatypeName) {
        case "timestamptz":
            return 'datetime-local';
        case "numeric":
            return 'number';
        default:
            return datatypeName;
    }
}