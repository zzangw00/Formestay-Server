function returnTagList(list) {
    for (let i = 0; i < list.length; i++) {
        let count = 0;
        let idx = -1;
        let tagList = [];
        let tag = list[i]['tag'];
        if (tag != null) {
            count = 1;
            do {
                idx = tag.indexOf('|', idx + 1);
                if (idx != -1) {
                    count++;
                }
            } while (idx != -1);

            tagList = tag.split('|');
            list[i]['tag'] = tagList;
        } else {
            list[i]['tag'] = null;
        }
    }
    return list;
}

function returnOneTagList(object) {
    let count = 0;
    let idx = -1;
    let tagList = [];
    let tag = object['tag'];
    if (tag != null) {
        count = 1;
        do {
            idx = tag.indexOf('|', idx + 1);
            if (idx != -1) {
                count++;
            }
        } while (idx != -1);

        tagList = tag.split('|');
        object['tag'] = tagList;
    } else {
        object['tag'] = null;
    }

    return object;
}

module.exports = {
    returnTagList,
    returnOneTagList
};