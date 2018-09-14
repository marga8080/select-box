const orgData = [

    {
        "id": "110000",
        "leaf": false,
        "name": "北京市",
        "children":
            [
                {
                    "id": "110101",
                    "leaf": true,
                    "name": "东城区"
                },
                {
                    "id": "110102",
                    "leaf": true,
                    "name": "西城区"
                },
                {
                    "id": "110105",
                    "leaf": true,
                    "name": "朝阳区"
                },
                {
                    "id": "110106",
                    "leaf": true,
                    "name": "丰台区"
                },
                {
                    "id": "110107",
                    "leaf": true,
                    "name": "石景山区"
                },
                {
                    "id": "110108",
                    "leaf": true,
                    "name": "海淀区"
                },
                {
                    "id": "110109",
                    "leaf": true,
                    "name": "门头沟区"
                },
                {
                    "id": "110111",
                    "leaf": true,
                    "name": "房山区"
                },
                {
                    "id": "110112",
                    "leaf": true,
                    "name": "通州区"
                },
                {
                    "id": "110113",
                    "leaf": true,
                    "name": "顺义区"
                },
                {
                    "id": "110114",
                    "leaf": true,
                    "name": "昌平区"
                },
                {
                    "id": "110115",
                    "leaf": true,
                    "name": "大兴区"
                },
                {
                    "id": "110116",
                    "leaf": true,
                    "name": "怀柔区"
                },
                {
                    "id": "110117",
                    "leaf": true,
                    "name": "平谷区"
                },
                {
                    "id": "110118",
                    "leaf": true,
                    "name": "密云区"
                },
                {
                    "id": "110119",
                    "leaf": true,
                    "name": "延庆区"
                }

            ]

    },

    {
        "id": "130000",
        "leaf": false,
        "name": "河北省",
        "children":
            [
                {
                    "id": "130100",
                    "name": "石家庄市",
                    "leaf": false,
                    "children":
                        [
                            {
                                "id": "130102",
                                "leaf": true,
                                "name": "长安区"
                            },
                            {
                                "id": "130104",
                                "leaf": true,
                                "name": "桥西区"
                            },
                            {
                                "id": "130105",
                                "leaf": true,
                                "name": "新华区"
                            },
                            {
                                "id": "130107",
                                "leaf": true,
                                "name": "井陉矿区"
                            },
                            {
                                "id": "130108",
                                "leaf": true,
                                "name": "裕华区"
                            },
                            {
                                "id": "130109",
                                "leaf": true,
                                "name": "藁城区"
                            },
                            {
                                "id": "130110",
                                "leaf": true,
                                "name": "鹿泉区"
                            },
                            {
                                "id": "130111",
                                "leaf": true,
                                "name": "栾城区"
                            },
                            {
                                "id": "130121",
                                "leaf": true,
                                "name": "井陉县"
                            },
                            {
                                "id": "130123",
                                "leaf": true,
                                "name": "正定县"
                            },
                            {
                                "id": "130125",
                                "leaf": true,
                                "name": "行唐县"
                            },
                            {
                                "id": "130126",
                                "leaf": true,
                                "name": "灵寿县"
                            },
                            {
                                "id": "130127",
                                "leaf": true,
                                "name": "高邑县"
                            },
                            {
                                "id": "130128",
                                "leaf": true,
                                "name": "深泽县"
                            },
                            {
                                "id": "130129",
                                "leaf": true,
                                "name": "赞皇县"
                            },
                            {
                                "id": "130130",
                                "leaf": true,
                                "name": "无极县"
                            },
                            {
                                "id": "130131",
                                "leaf": true,
                                "name": "平山县"
                            },
                            {
                                "id": "130132",
                                "leaf": true,
                                "name": "元氏县"
                            },
                            {
                                "id": "130133",
                                "leaf": true,
                                "name": "赵县"
                            },
                            {
                                "id": "130181",
                                "leaf": true,
                                "name": "辛集市"
                            },
                            {
                                "id": "130183",
                                "leaf": true,
                                "name": "晋州市"
                            },
                            {
                                "id": "130184",
                                "leaf": true,
                                "name": "新乐市"
                            }

                        ]

                }
            ]
    },
];


const userData = [
    {
        id: 1111,
        name: "张三",
        dept: ["130183", "130184"],
    },
    {
        id: 2222,
        name: "李四",
        dept: ["110101"],
    },
    {
        id: 3333,
        name: "辛弃疾",
        dept: ["110101", "110102"],
    },
    {
        id: 4444,
        name: "张无忌",
        dept: ["110101", "110102"],
    },
    {
        id: 5555,
        name: "张家",
        dept: ["110105", "110107"],
    },
];

const tagData = [
    {
        id: 't11',
        name: '分级管理员11',
        type: 'tag'
    },
    {
        id: 't21',
        name: '分级管理员21',
        type: 'tag'
    },
]

/**
 * 字符串反转
 * @param str
 * @returns {*|string}
 */
function reverse(str){
    if (!str) {
        return null;
    }
    return str.split("").reverse().join("");
}


/**
 * 用户按部门归类
 */
function user2dept(users) {
    let deptusers = [];
    users.map(u => {
        if (u.dept) {
            u.dept.map(item => {
                let nuser = deepcopy(u);
                delete nuser.dept;
                let du = deptusers.find(e => e.dept === item);
                if (du) {
                    du.users.push(nuser);
                } else {
                    let tmp = {dept: item};
                    tmp.users = [nuser];
                    deptusers.push(tmp)
                }
            })
        }
    });
    return deptusers;
}

/**
 * 按部门id归类 包括子节点
 * @param users
 * @param deptid
 * @returns {Array}
 */
function user2deptid(users, deptid) {
    let rid = reverse(deptid);
    rid = rid - 0;
    let did = reverse(rid.toString());
    let duers = [];
    users.map(u => {
        if (u.dept) {
            let match = false;
            u.dept.map(d => {
                if (d.substring(0, did.length) === did) {
                    match = true;
                }
            })
            if (match) {
                let nuser = deepcopy(u);
                delete nuser.dept;
                duers.push(nuser);
            }
        }
    });
    return duers;
}

/**
 * 深拷贝
 * @param json
 * @returns {any}
 */
function deepcopy(json) {
    return JSON.parse(JSON.stringify(json));
}

/**
 * 树形结构改成列表
 * @param orgs
 * @param list
 */
function org2list(orgs, list=[]) {
    orgs.map(item => {
        // 深拷贝
        let newitem = deepcopy(item);
        delete newitem.children;
        newitem.type = "dept";
        list.push(newitem);
        if (item.children) {
            org2list(item.children, list);
        }
    })
}

/**
 * 用户列表
 * @param users
 * @param list
 */
function user2list(users, list=[]) {
    users.map(item => {
        // 深拷贝
        let newitem = deepcopy(item);
        delete newitem.dept;
        newitem.type = "user";
        list.push(newitem);
    })
}

/**
 * 根据id查找子节点
 * @param orgs
 * @param id
 * @returns {*}
 */
function findOrgChildren(orgs=[], id) {
    if (!id) { // 如果id为空 则获取第一个节点
        let res = deepcopy(orgs);
        res.map(item => {
            delete item.children; //只找一级 所以删除子节点
        });
        return res;
    }
    for (let i in orgs) {
        const org = orgs[i];
        if (org.id === id) {// 如果id为空 则获取第一个节点
            if (org.children) {
                let res = deepcopy(org.children);
                res.map(item => {
                    delete item.children; //只找一级 所以删除子节点
                });
                return res;
            }
        } else if (org.children) {
            // 递归
            let res = findOrgChildren(org.children, id);
            if (res) {
                return res;
            }
        }
    }
    return null;
}

/**
 * 通过名称模糊查询列表
 * @param list
 * @param name
 * @returns {*|Array}
 */
function search4name(list, name) {
    return list.filter((item) => (item.name.indexOf(name) !== -1)) || [];
}


/**
 * 根据名称搜索
 * @param name
 * @returns {Promise}
 */
export async function search(name) {
    //console.log(name);
    let orglist = [], userlist = [];
    org2list(orgData, orglist);
    user2list(userData, userlist);
    let all = [...orglist, ...userlist, ...tagData];
    return new Promise((resolve) => {
        //setTimeout(() => {
            resolve(search4name(all, name));
        //}, 1000);
    });
}

/**
 * 根据部门id查找部门
 * @param deptid
 * @returns {Promise}
 */
export async function fetchDept(deptid) {
    //console.log("fetchDept", deptid);
    return new Promise((resolve) => {
        const data = findOrgChildren(orgData, deptid);
        //console.log("data", data)
        resolve(data);
    });
}

/**
 * 根据部门id查找用户
 * @param id
 * @returns {Promise}
 */
export async function fetchUser(deptid, pageNo) {
    //console.log("pageNo", pageNo);
    return new Promise((resolve) => {
        const data = user2deptid(userData, deptid);
        //console.log("data", data)
        resolve(data);
    });
}



export async function fetchTag(pageNo) {
    //console.log("pageNo", pageNo);
    return new Promise((resolve) => {
        let data = [];
        for (let i = 1; i <= 10; i++) {
            let item = {};
            item.name = "分级管理员" + pageNo + i;
            item.id = "t" + pageNo + i;
            item.type = "tag";
            data.push(item);
        }
        resolve(data);
    });
}