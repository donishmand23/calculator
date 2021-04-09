const numbers = document.querySelectorAll('.num')
const operators = document.querySelectorAll('.sign')
const equal = document.querySelector('.equal')
const dot = document.querySelector('.dot')
const display = document.querySelector('input')
const clearButton = document.querySelectorAll('.remove-element')[0]
const removeButton = document.querySelectorAll('.remove-element')[1]
const operatorStore = ['+', '✕', '-', '÷']
let sign
let iDot

function concatValue (char) {
	display.value = display.value + char
}

function clearDisplay () {
	display.value = null
	sign = undefined
	iDot = false
}

function calculate () {
	if(sign === '✕') {
		let nums = display.value.split('✕')
		display.value = nums[0] * nums[1]
	}
	if(sign === '÷') {
		let nums = display.value.split('÷')
		display.value = nums[0] / nums[1]
	} else {
		display.value = eval(display.value)
	}
	sign = undefined
}

function removeDisplay () {
	let deleted = display.value[display.value.length - 1]
	if(operatorStore.includes(deleted)) {
		sign = undefined
		iDot = true
	}
	if(deleted == '.') {
		iDot = false
	}
	display.value = display.value
	.split('')
	.splice(0, display.value.length - 1)
	.join('')
}

for(let num of numbers) {
	num.onclick = (event) => {
		concatValue(event.target.textContent)
	}
}

for(let operator of operators) {
	operator.onclick = (event) => {
		if(!sign && display.value != '') {
			concatValue(event.target.textContent)
			sign = event.target.textContent
			iDot = false
		} 
		else if(operatorStore.includes(display.value[display.value.length - 1])) {
			removeDisplay()
			concatValue(event.target.textContent)
			sign = event.target.textContent
			iDot = false
		}
	}
}

dot.onclick = (event) => {
	if(display.value != '' && !iDot) {
		if(operatorStore.includes(display.value[display.value.length - 1])) {
			concatValue('0.')
		} else {
			concatValue('.')
		}
		iDot = true
	}
}

equal.onclick = calculate
clearButton.onclick = clearDisplay
removeButton.onclick = removeDisplay

