export function sortListOfObjects(list, attr) {
        list.sort(function (a, b) {
            return parseFloat(b[attr]) - parseFloat(a[attr])
        })
    }