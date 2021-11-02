const {pool} = require("../../../config/database");


// 대표 업체 조회
async function selectBestEnterprises(connection) {
    const selectBestEnterprisesQuery = `
        select Enterprise.enterpriseId, korName, engName, location, tag, thumbnailURL
        from Enterprise left join (
            select enterPriseId, count(*) as num
            from ViewProgram
            group by enterPriseId
        ) as EN on Enterprise.enterpriseId = EN.enterpriseId
        where Enterprise.status = "ACTIVE"
        order by EN.num desc, createdAt desc limit 5;
    `;
    const [selectBestEnterprisesRows] = await connection.query(selectBestEnterprisesQuery);
    return selectBestEnterprisesRows;
}

module.exports = {
    selectBestEnterprises
};
