

class MysteryWordFrequency {
	constructor(text){
		this.frequencies = this._setFrequencies(text)
		const words = this.words()
		const totalWords = words.length
		this.previous = words[Math.floor(Math.random() * totalWords)] // word (index of random number)
	}

	_setFrequencies(text){
		const countWords = (count, word, index, arr) => {
			const nextWord = arr[index + 1] // next value to be reduced in count words
			if (nextWord){ // does next word exist with length
				if (!count[word]) { // if word in the object count doesn't exist
					count[word] = {} // set the value of that word to empty object -- first time encounter of word
				}
				if (!count[word][nextWord]){
					count[word][nextWord] = 0
				}
				count[word][nextWord]++
			}
			return count
		}
		const fiendCleaner = (str) => {
			return str.replace(/[^A-Za-z']+/g,"")
		          .replace(/^'/, "")
             	  .replace(/'$/,"");
		}
		return text.toLowerCase()
			  .split(/[\s;.-]+/)
			  .filter(word => word.length > 0)
			  .map(fiendCleaner)
			  .reduce(countWords, {})
	}

	words(){
		return Object.keys(this.frequencies)
	}

	count(word){
		const counts = Object.values(this.frequencies[word]);
		return counts.reduce((a, b) => a + b);
	}

	randomWord(){
		const relativeFreq = this.frequencies[this.previous]// an object
		const getWord = (total,next) => {
	    	const freq = relativeFreq[next];
	    	const isString = typeof total === "string";
	    	const newTotal = freq >= total ? next : total - freq ;
	   	 	return isString ? total : newTotal
	  	}
	  	const random = Math.ceil(Math.random() * this.count(this.previous))
		const word = Object.keys(relativeFreq).reduce(getWord, random)
		this.previous = word;
		return word;

	}
}

module.exports = MysteryWordFrequency
