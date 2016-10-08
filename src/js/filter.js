import Vue from 'vue'

Vue.filter('tabName',function(topic){   if(topic.good==true){return '精华'}else
	if(topic.top==true){return '置顶'}else if(topic.tab=='share'){return '分享'}else
		if(topic.tab=='ask'){return '提问'}else if(topic.tab=='job'){return '招聘'} })

Vue.filter('tabNameCn',function(router){  
	if(router.name=='tab'){
		let tab=router.params.tab
		if(tab=='all'){ return '全部'}
			else if(tab=='good'){return '精华'}
			else if(tab=='share'){return '分享'}
			else if(tab=='ask'){return '问答'}
			else if(tab=='job'){return '招聘'} 
	} else if(router.name=='create'){
		return '新建主题'
	} else if(router.name=='user'){
		return '用户信息'
	} else if(router.name=='loginIn'){
		return '登陆'
	} else if(router.name=='topic'){
		return '内容'
	}
})
	

Vue.filter('last_reply_at',function(time){   
	let old=new Date(time);old=old.getTime();   
	let now=new Date();now=now.getTime();   
	let diff=now-old;   
	let minute=1000*60, hour=minute*60, day=hour*24, month=day*30, year=month*12;   
	let minuteD=diff/minute, hourD=diff/hour, dayD=diff/day, monthD=diff/month, yearD=diff/year;   
	if(yearD>=1){return parseInt(yearD)+'年前'}
		else if(monthD>=1){return parseInt(monthD)+'个月前'}
			else if(dayD>=1){return parseInt(dayD)+'天前'}
				else if(hourD>=1){return parseInt(hourD)+'小时前'}
					else if(minuteD>=1){return parseInt(minuteD)+'分钟前'}
						else{return '刚刚'}  })

Vue.filter('replaceLink',function(ele){   
//将后台返回的a标签中的 /user/:loginname 替换为/#!/user/:loginname     
	return ele.replace(/<a\s+href=['"]\/user\/([\w\-]+)['"]>@\1\s*<\/a>/ig,
		'<a href="/#!/user/$1">@$1</a>') 
})

