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
            list[i]['tag'] = [];
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
        object['tag'] = [];
    }

    return object;
}

function makeReservationNumber() {
    let now = new Date();
    let timestamp = now.getFullYear().toString();
    timestamp += (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1).toString();
    timestamp += (now.getDate() < 10 ? '0' : '') + now.getDate().toString();
    timestamp += (now.getHours() < 10 ? '0' : '') + now.getHours().toString();
    timestamp += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes().toString();
    timestamp += (now.getSeconds() < 10 ? '0' : '') + now.getSeconds().toString();
    if (now.getMilliseconds() < 10) {
        timestamp += '00' + now.getMilliseconds().toString();
    } else if (now.getMilliseconds() < 100) {
        timestamp += '0' + now.getMilliseconds().toString();
    } else {
        timestamp += now.getMilliseconds().toString();
    }
    return timestamp;
}

module.exports = {
    returnTagList,
    returnOneTagList,
    makeReservationNumber
};