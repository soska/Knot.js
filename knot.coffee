window.Knot = 

	__bindings : {}
	
	__data : {}

	bind : (el, type, property)->

		if type is "syndicate" 

			@syndicate el, property
			if @__data[property]? && @__bindings[property].length?				
				@__bindings[property].forEach (binding) =>				
					if el.hasOwnProperty "value"
							el.value = @__data[property]

		else

			@__bindings[property] = [] unless typeof @__bindings[property] isnt "undefined"
			@__bindings[property].push el:el, type: type 
		
			@__data[property] = do =>		
				if type is "html" then return el.innerHTML
				if matches = type.match('^style\:(.+)')  then return window.getComputedStyle(el)[matches[1]]


	syndicate : (el, property)->
		
		if el.hasOwnProperty "value"
			$(el).keyup (e) => 
				@.set(property,el.value)
		
	set : (property, value)->
		
		@__data[property] = value;		
		
		if @__bindings[property]? 			
			@__bindings[property].forEach (o)->
				if o.type is "html" 					
					o.el.innerHTML = value
				else if matches = o.type.match('^style\:(.+)')  
					o.el.style[matches[1]] = value
					


$.fn.knot = (type, property)->
	@.each -> Knot.bind(@, type, property)
	return @