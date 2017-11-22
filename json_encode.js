const JSON_HEX_QUOT = 8;
const JSON_HEX_TAG = 1;
const JSON_HEX_AMP = 2;
const JSON_HEX_APOS = 4;
const JSON_NUMERIC_CHECK = 32;
const JSON_UNESCAPED_SLASHES = 64;
const JSON_UNESCAPED_UNICODE = 256;
const JSON_FORCE_OBJECT = 16;
function json_encode(val,options = 0){
	var   gettype=Object.prototype.toString;
	switch( gettype.call(val) ){
		case '[object String]':
			return json_escape_string(val,options);
		break;
		case '[object Number]':
			if(val % 1 === 0){
				return val;
			}else{
				return isFinite(val)?val:0;
			}
		break;
		case '[object Boolean]':
			return val?true:false;
		break;
		case '[object Undefined]':
			return null;
		break;
		case '[object Null]':
			return null;
		break;
		case '[object Object]':
			return json_encode_array(val,options);
		break;
		case '[object Array]':
			return json_encode_array(val,options);
		break;
		case '[object Function]':
			return null;
		break;
		default:
			return null;
		break;
	}
	
}

function json_escape_string(val,options){
	var pos = 0;
	var len = val.length;
	if(len == 0){
		return '""';
	}
	if(options & JSON_NUMERIC_CHECK){
		if (!isNaN(parseInt(val))) {
　　　　	if(val % 1 === 0){
					return val;
				}else{
					return isFinite(val)?val:0;
			}
　　	}
	}
	if(len == null){
		return null;
	}else if(len == 0){
		return '""';
	}
	var result = '"';
	while(pos < len){
		us = val.charAt(pos);
		switch(us){
			case '"':
				if(options & JSON_HEX_QUOT){
					result += "\\u0022";
				}else{
					result += "\\\"";
				}
				break;
			case '\\':  
				result += "\\\\";
				break;
			case '/':
				if (options & JSON_UNESCAPED_SLASHES ) {  
					result += us;
				} else {  
					result += "\\/";
				}
				break; 
			case '\b':  
				result += "\\b";
				break;  

			case '\f':  
				result += "\\f";
				break;  

			case '\n':  
				result += "\\n";
				break;  

			case '\r':  
				result += "\\r";
				break;  

			case '\t':  
				result += "\\t";
				break;  

			case '<':  
				if (options & JSON_HEX_TAG) {  
					result += "\\u003C";
				} else {  
					result += '<';
				}  
				break;  

			case '>':  
				if (options & JSON_HEX_TAG) {  
					result += "\\u003E";
				} else {  
					result += '>';
				}  
				break;  

			case '&':  
				if (options & JSON_HEX_AMP) {  
					result += "\\u0026";
				} else {  
					result += '&';
				}  
				break;  

			case '\'':  
				if (options & JSON_HEX_APOS) {  
					result += "\\u0027";
				} else {  
					result += '\'';
				}  
				break;  

			default:
				if ((us >= ' ' && (us & 127) == us) || IsDigit(us) || IsAlpha(us) || (options & JSON_UNESCAPED_UNICODE)) {  
					result += us;
				}else{
					result += "\\u"+parseInt(us.charCodeAt(0),10).toString(16);
				}
				break;
		}
		pos++;
	}
	result += '"';
	return result;

}

function IsDigit(cCheck) { return (('0'<=cCheck) && (cCheck<='9')); }

function IsAlpha(cCheck) { return ((('a'<=cCheck) && (cCheck<='z')) || (('A'<=cCheck) && (cCheck<='Z'))) }

function is_index_array(val,options){
	if(options & JSON_FORCE_OBJECT){
		return false;
	}
	var index = 0;
	for(var item in val){ 
		if(item == index){
			index++;
		}else{
			return false;
		}
	}
	return true;
}

function json_encode_array(val,options){
	if(!is_index_array(val,options)){
		var result = '{';
	}else{
		var result = '[';
	}
	if(!is_index_array(val,options)){
		for(var item in val){ 
			result += json_encode(item,options)+':'+json_encode(val[item],options);
			result += ',';
		}
	}else{
		for(var item in val){
			result += json_encode(val[item]);
			result += ',';
		}
	}
	if(result.length > 1){
		result = result.substring(0,result.length-1)
	}
	if(!is_index_array(val,options)){
		result += '}';
	}else{
		result += ']';
	}
	return result;
}
