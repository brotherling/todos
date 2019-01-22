(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	new Vue({
		el: "#app",
		data: {
			shop: '',
			id: 1,
			shops: [],
			leftCount: 0,
			editShop: '',
			focusState: ''
		},
		directives: {
			focus: {
				update: function (el, { value }) {

					if (value) {
						el.focus()
					}
				}
			}
		},
		methods: {
			calLeft() {
				let newArr = []
				this.shops.forEach(item => {
					if(item.complete == false){
						newArr.push(item)
					}
				});	
				this.leftCount = newArr.length
			},
			addShop(name){
				let addShop = { id: this.id++, name: name, complete: false, flag: false }
				this.shops.push(addShop)
			},
			add(){
				if(this.shop.trim() == '') return alert("请输入内容")
				this.addShop(this.shop)
				this.shop = ''
				this.calLeft()
			},
			del(index){
				this.shops.splice(index,1)
				this.calLeft()
			},
			leave(index){
				this.focusState = false
				this.change(index)
			},
			edit(dblId){
				this.focusState = true
				this.shops.forEach((item, index) => {
					if (dblId == index) {
						item.flag = true
						this.editShop = item.name
					}else{
						item.flag = false
					}
				});
			},
			change(changeId){
				if (this.editShop.trim() == '') return alert("请输入内容")
				this.shops.forEach((item, index) => {
					if (changeId == index) {
						item.name = this.editShop
						item.flag = false
					}
				});
			},
			completed(clkId){
				this.shops.forEach((item, index) => {
					if (clkId == index){
						item.complete = !item.complete
					}
				});
				this.calLeft()
			},
			completeAll(){
				let flagEvery = this.shops.every(item => {
					return item.complete == true
				});
				// console.log(flagEvery)
				this.shops.forEach(item => {
					if (flagEvery) {
						item.complete = false
					} else {
						if(item.complete == false){
							item.complete = true
						}
					}
				});	
				this.calLeft()
			},
			clearCompleted(){
				let arr = []
				this.shops.forEach(item => {
					if (item.complete == false) {
						arr.push(item)
					}
				});
				this.shops = arr
			}
			

		}
	})

})(window);
