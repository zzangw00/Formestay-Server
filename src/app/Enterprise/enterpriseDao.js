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

// 전체 업체 조회
async function selectAllEnterprises(connection, page) {
    const selectAllEnterprisesQuery = `
        select enterpriseId, korName, engName, location, tag, thumbnailURL
        from Enterprise
        where status="ACTIVE"
        order by createdAt desc LIMIT ?, 10;
    `;
    const [selectAllEnterprisesRows] = await connection.query(selectAllEnterprisesQuery, page);
    return selectAllEnterprisesRows;
}

// 카테고리별 업체 조회
async function selectCategoryEnterprises(connection, category, page) {
    const selectCategoryEnterprisesQuery = `
        select enterpriseId, korName, engName, location, tag, thumbnailURL
        from Enterprise
        where category = ? and status="ACTIVE"
        order by createdAt desc LIMIT ?, 10;
    `;
    const [selectCategoryEnterprisesRows] = await connection.query(selectCategoryEnterprisesQuery, [category, page]);
    return selectCategoryEnterprisesRows;
}

module.exports = {
    selectBestEnterprises,
    selectAllEnterprises,
    selectCategoryEnterprises
};
