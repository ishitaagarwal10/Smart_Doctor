var shell=require("shelljs");
const {Translate} = require("@google-cloud/translate");
shell.exec("export GOOGLE_APPLICATION_CREDENTIALS='gkey.json'");
// Imports the Google Cloud client library


// Your Google Cloud Platform project ID
const projectId = 'doctalk-translate';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The text to translate
var str='do you have fever?';
const text = str;
// The target language
const target = 'hi';

// Translates some text into Hindi
translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];

    //console.log(`Text: ${text}`);
    //console.log(`Translation: ${translation}`);
   
   var s=translation;
   console.log(s);
	 // Load the SDK
//	const AWS = require('aws-sdk')
//	const Fs = require('fs')

	// Create an Polly client
//	const Polly = new AWS.Polly({
  //  	signatureVersion: 'v4',
    //	region: 'ap-south-1'
	//})

	//let params = {
    //	'Text': s,
    	//'OutputFormat': 'mp3',
    	//'VoiceId': 'Aditi'
	//}

	/*Polly.synthesizeSpeech(params, (err, data) => {
    	if (err) {
        	console.log(err.code)
    	} else if (data) {
        	if (data.AudioStream instanceof Buffer) {
            	Fs.writeFile("./speech.mp3", data.AudioStream, function(err) {
                	if (err) {
                    	return console.log(err)
                	}
                	console.log("The file was saved!")
            	})
        	}
    	}
	})*/
  })
  .catch(err => {
    console.error('ERROR:', err);
  });