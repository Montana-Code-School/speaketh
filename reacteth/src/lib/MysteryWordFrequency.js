

class MysteryWordFrequency {
	constructor(text){                                         
		this.frequencies = this._setFrequencies(text)  //
		const words = this.words()    
		const totalWords = words.length     
		this.previous = words[Math.floor(Math.random() * totalWords)]     //this.previous is the random word generator. 
	}

	_setFrequencies(text){                                         
		const countWords = (count, word, index, arr) => {           //this is a reduce function; count = freq object,                    
		   const nextWord = arr[index + 1]                          //this is going to give us our word AND the word following it
			if (nextWord){
				if (!count[word]) {                                 //if there is no next word, we just skip to the return.  this 
					count[word] = {}                                //loops through the whole array
					                                                //do we have a count for a word? no, we make an empty object. if yes,then we just add to it.
				} 
				if (!count[word][nextWord]){                        //testing if we have seen this word combination previously, if its falsy...set it to zero
					count[word][nextWord] = 0                                                  
				}	                                                         
				count[word][nextWord]++                             //increments the counts.
				
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
		return Object.keys(this.frequencies)          //                     
	}

	count(word){
		const counts = Object.values(this.frequencies[word]);             //this makes an object of the counts of each of the words that follow the word counted   
		return counts.reduce((a, b) => a + b);                            //an array-      a+b ---> adding numbers together gets a list of counts, run reduce to add up all of the counts          
	}

	randomWord(){                                                           //give the value of the object....frequency of the word that follow   
		const relativeFreq = this.frequencies[this.previous]               //creates an object of the keys;  gives you the chance that a word is going to be followed by another word     
		const getWord = (total,next) => {                                  
	    	const freq = relativeFreq[next];
	    	const isString = typeof total === "string";
	    	const newTotal = freq >= total ? next : total - freq ;
	   	 	return isString ? total : newTotal
	  	}
	  	const random = Math.ceil(Math.random() * this.count(this.previous))   //taking a random number between the count of the word appearing and then the count its pairing....so vile fiend, vile scoundrel...vile gets chosen...the random count will be 2...so either 1 comes up and the pair is vile fiend
		const word = Object.keys(relativeFreq).reduce(getWord, random)     
		this.previous = word;
		return word;

	}
}



module.exports = MysteryWordFrequency