var pieChartResult={
		passPer:0,
		failPer:0,
		remainsPer:100,
};
var catChartResult={
		gen:0,
		obc:0,
		sc:0,
		st:0
		
};
var barChartResult=null;
var keys=new Array();
var chartVal = new Array();
var chartBase = new Array();
function getLatestValues() {
	 
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			// check for HTTP status of OK
			if (req.status == 200) {
				try {
					//alert(req.responseText);
					var job=JSON.parse(req.responseText);
					
					//Set Result for Pie Chart
					var pieChart=job["pieChart"];
					male=pieChart["male"];
					
					female=pieChart["female"];
					total=pieChart["total"];
					
					pieChartResult.failPer=0;
					pieChartResult.remainsPer=Math.round((male*100)/total,1);
					pieChartResult.passPer=Math.round((female*100)/total,1);
		            
					//demo.initChartist();
					//Set Result For Bar Chart 
					keys= new Array();
					chartVal = new Array();
					chartBase = new Array();
					
					barChartResult=job["barChart"];
					//barChartResult=job;
					for(key in barChartResult){
						keys.push(key);
						chartVal.push(barChartResult[key][0]);
						chartBase.push(barChartResult[key][1]);
					}
					//alert(chartVal);
					var buildidElement=document.getElementById("buildid");
					buildidElement.innerHTML="Total Strength:- "+ total;
					
					demo.initChartist();
				
				//// Pie chart for category
					var catChart=job["catChart"];
					gen=catChart["general"];
					sc=catChart["sc"];
					st=catChart["st"];
					obc=catChart["obc"];
					total=catChart["total"];
					
					catChartResult.gen=Math.round((gen*100)/total,1);
					catChartResult.obc=Math.round((obc*100)/total,1);
					catChartResult.sc=Math.round((sc*100)/total,1);
					catChartResult.st=Math.round((st*100)/total,1);
					
					var totcatElement=document.getElementById("totcat");
					totcatElement.innerHTML="Total Strength:- "+ total;
					
					demo1.initChartist1();
				} catch (e) {
					console.log("Exception::-"+e.toString());
				}
			}
		}
	};
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	req.open("POST", base_url + "/service.php", true);
	req.send(null);
}

function getFeeReport() {
	 
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			// check for HTTP status of OK
			if (req.status == 200) {
				try {
					//alert(req.responseText);
					var job=JSON.parse(req.responseText);
					
					
					//Set Result For Pie Chart 
					keys= new Array();
					chartVal = new Array();
					chartBase = new Array();
					
					//barChartResult=job["pieChart"];
					barChartResult=job["pieChart"];
					//alert(job["total"]);
					//alert(JSON.stringify(barChartResult));
					
					for(key in barChartResult){
						keys.push(key);
						
						chartVal.push(barChartResult[key]);
						chartBase.push(key);
					}
					
					var expElement=document.getElementById("expected");
					expElement.innerHTML= "Rs. " + Math.round(job["total"],1) + "K";
					
					var discountElement=document.getElementById("discount");
					discountElement.innerHTML= "Rs. " + Math.round(job["discount"],1) ;
					
					var actualElement=document.getElementById("actual");
					actualElement.innerHTML= "Rs. " + Math.round(job["recieved"],1) ;
				
				
					demo.initChartist();
				} catch (e) {
					console.log("Exception::-"+e.toString());
				}
			}
		}
	};
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	req.open("POST", base_url + "/feeservice.php", true);
	req.send(null);
}


