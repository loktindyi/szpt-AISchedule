function sema(semai){
    let semau = []
    semai = semai.replace(/第|周/g,"").replace('，',',')
    semai.split(",").forEach(w => {
        if (w.search('-') != -1) {
            let range = w.split("-")
            let start = parseInt(range[0])
            let end = parseInt(range[1])
            for (let i = start; i <= end; i++) {
               if (!semau.includes(i)) {
                    semau.push(i)
               }
            }
        } else if (w.length != 0) {
            let v = parseInt(w);
            if (!semau.includes(v)) {
                semau.push(v)
            }
        }
    })
    return semau;
}

function tago(tagoi){
    let tagoLi = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    return tagoLi.indexOf(tagoi) + 1
}

function sekcio(sekcioi){
    let sekciou = []
    sekcioi = sekcioi.replace(/第|节/g,"").replace('，',',')
    sekcioi.split(",").forEach(w => {
        if (w.search('-') != -1) {
            let range = w.split("-")
            let start = parseInt(range[0])
            let end = parseInt(range[1])
            for (let i = start; i <= end; i++) {
               if (!sekciou.includes(i)) {
                    sekciou.push({ section: i })
               }
            }
        } else if (w.length != 0) {
            let v = parseInt(w);
            if (!sekciou.includes(v)) {
                sekciou.push({ section: v })
            }
        }
    })
    return sekciou
}

function akiriKinf(arko){
    let courses = []
    let course = {}
    for (let i = 2; i < arko.length; i += 10){
        course = {}
        course.name = arko[i]
        course.teacher = arko[i+1]
        course.position = arko[i+4].replace(/西丽湖校区|留仙洞校区|官龙山校区/g,'').replace('楼','-')
        course.weeks = sema(arko[i+3])
        course.day = tago(arko[i+5])
        course.sections = sekcio(arko[i+6])
        courses.push(course)
    }
    return courses
}

function visZib(html){
    let info = []
    const $ = cheerio.load(html, { decodeEntities: false })
    $("#gvSchedule tbody").each(function(){
        $(this).find("td").each(function(){
            info.push($(this).text())
        })
    })
    for (let i = 0; i < info.length; i += 10){
        if (/单|整/.test(info[i])){
            info.splice(i,10)
            i-=10
        }
    }
    let infoi = []
    let nom = ""
    $("#gvScheduleAllWeek tbody").each(function(){
        $(this).find("td").each(function(){
            infoi.push($(this).text())
        })
    })
    for (let i = 0; i < infoi.length; i += 10){
        if (/单|整/.test(infoi[i])){
            nom = infoi[i+2]
            infoi.splice(i,10)
            i-=10
        } else {
            infoi[i+2] = nom        
        }
    }
    infoi.forEach(v => {
        info.push(v)
    })
    return akiriKinf(info)
}

function scheduleHtmlParser(html) {
    let result = []
    let sekciot = [
    {
        section: 1,
        startTime: "",
        endTime: ""
    },{
        section: 2,
        startTime: "",
        endTime: ""
    },{
        section: 3,
        startTime: "",
        endTime: ""
    },{
        section: 4,
        startTime: "",
        endTime: ""
    },{
        section: 5,
        startTime: "",
        endTime: ""
    },{
        section: 6,
        startTime: "",
        endTime: ""
    },{
        section: 7,
        startTime: "",
        endTime: ""
    },{
        section: 8,
        startTime: "",
        endTime: ""
    },{
        section: 9,
        startTime: "",
        endTime: ""
    },{
        section: 10,
        startTime: "",
        endTime: ""
    }]
    result = visZib(html)
    return { courseInfos: result }
}