define([], function(){
	return {

		MONTH_NAMES:[
			'January',
			'Feburary',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],

		TIMES:{
			second:1000,
			minute:60000,
			hour:3600000,
			day:86400000,
			week:604800000,
			month:2419200000
		},

		secondsToMillis:function(seconds){
			return seconds * 1000;
		},

		getNiceDate:function(date){
			return date.getDate() +" " + this.MONTH_NAMES[date.getMonth()] +", " + date.getFullYear() ;
		},
		// TODO: refactor into minimethods. TDD it
		getContextualDate:function(d) {
			var date = new Date(d);
			var deltaTime = new Date() - date;
			var text, ts, unit;
			if(deltaTime < this.TIMES.minute) {
				ts = Math.floor(deltaTime/1000 );
				unit = this.pluralize('minute', ts);
				text = ts + " "+unit+" ago";
			} else if(deltaTime < this.TIMES.hour) {
				ts = Math.floor(deltaTime / (60*1000));
				unit = this.pluralize('minute', ts);
				text = ts + " "+unit+" ago";
			} else if(deltaTime < this.TIMES.day) {
				ts = Math.floor(deltaTime / (3600 * 1000));
				unit = this.pluralize('hour', ts);
				text = ts + " "+unit+" ago";
			} else if(deltaTime < this.TIMES.week) {
				ts = Math.floor(deltaTime / (86400 * 1000));
				unit = this.pluralize('day', ts);
				text = ts + " "+unit+" ago";
			} else if(deltaTime < this.TIMES.month) {
				ts =Math.floor(deltaTime / (86400 *7 * 1000));
				unit = this.pluralize('week', ts);
				text = ts + " "+unit+" ago";
			} else if(deltaTime < this.TIMES.month * 3) {
				ts =Math.floor(deltaTime / (86400 *7 * 4* 1000));
				unit =this.pluralize('month',ts);
				text = ts + " "+unit+" ago";
			} else {
				text = this.getNiceDate(date);
			}
			return text;
		},

		pluralize:function(word, n){
			return n === 1? word: word+'s';
		},

		// toISOString doesn't work in ie8
		getISOString:function(date){
			if(!Date.prototype.toISOString){
				return date.getUTCFullYear()   + '-' +
				this.pad(date.getUTCMonth() + 1) + '-' +
				this.pad(date.getUTCDate())      + 'T' +
				this.pad(date.getUTCHours())     + ':' +
				this.pad(date.getUTCMinutes())   + ':' +
				this.pad(date.getUTCSeconds())   + 'Z';
			}
			return date.toISOString();
		},

		// TODO: this is string utils
		pad:function (n){
			return n<10? '0'+n : n;
		}


	};
});