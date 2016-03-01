function ConverttoInt(value) {
    try {
        return parseInt(value, 10);
    }
    catch (e) {
        return 0;
    }

}

function ReplaceString(base, oldvalue, newvalue) {
    return base.replace(oldvalue, newvalue);
}