/*
 *  Copyright (C) 2012 Andrew Oberstar
 *
 *  todo.txt-html5 is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  todo.txt-html5 is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with todo.txt-html5.  If not, see <http://www.gnu.org/licenses/>.
 */
var Todo = function() {
	this._complete = false
	this.priority = ''	
	this.description = ''
	this.created = new Date()
	this.completed = null
}

Todo.prototype = {
	get rDescription() {
		return this.description.replace(/(\(?(?:http|https|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|])/, '<a href="$1">$1</a>')
			.replace(/(@\w+)/, '<span class="todo-context">$1</span>')
			.replace(/(\+\w+)/, '<span class="todo-project">$1</span>')
	},
	get contexts() {
		return /@\w+/.exec(this.description)
	},
	get projects() {
		return /\+\w+/.exec(this.description)
	},
	get age() {
		return Math.round((new Date().getTime() - new Date(this.created).getTime())/(1000 * 60 * 60 * 24))
	},
	get rAge() {
		var age = this.age
		if (isNaN(age)) {
			return ''
		} else if (age == 0) {
			return 'Today'
		} else if (age == 1) {
			return 'Yesterday'
		} else {
			return age + ' days ago'
		}
	},
	get createdToday() {
		return this.getAge == 0
	},
	get complete() {
		return this._complete
	},
	set complete(isComplete) {
		this.completed = isComplete ? new Date() : null
		this._complete = isComplete
	},
	get status() {
		return this.complete ? 'complete' : 'incomplete'
	},
	hasPropertyValue: function(key, value) {
		var thisVal = this[key]
		if (thisVal instanceof Array) {
			return thisVal.indexOf(value) !== -1
		} else {
			return thisVal === value
		}
	}
}
