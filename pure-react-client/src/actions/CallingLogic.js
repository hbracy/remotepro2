import SimplePeer from 'simple-peer';
import wrtc from 'wrtc';

export default function setupCall(socket, peer, isInitiator) {
  if (SimplePeer.WEBRTC_SUPPORT) {
    // webrtc support!
    console.log('YES WEBRTC SUPPORT')
  } else {
    // fallback
    console.log('NO WEBRTC SUPPORT')

  }
	socket.on('iceServers', async res => {

    // let mediaStream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});

		console.log('ICE SERVER RESPONSE', res);
		const peer = new SimplePeer({
			initiator: isInitiator,
			config: { iceServers: res.ice_servers },
      // config: { iceServers: [] },
      trickle: true,
      allowHalfTrickle: true,

      // offerConstraints: { 
      //   offerToReceiveAudio: isInitiator, 
      //   offerToReceiveVideo: isInitiator 
      // },

      // answerConstraints: { 
      //   offerToReceiveAudio: isInitiator, 
      //   offerToReceiveVideo: isInitiator 
      // },
      // stream: mediaStream,
      objectMode: true,
      wrtc: wrtc
		});

		console.log(peer);

  	peer.on('signal', data => {
  		let signal = JSON.stringify(data); // Send this data to other peer for peer.signal()
  		console.log("SIGNAL:", signal);
  		if (peer.initiator) {
				console.log("SENDING OFFER");
  			socket.emit('offer', signal);
  		} else {
  				console.log("SENDING ANSWER");
  			socket.emit('answer', signal);
  		}
  	});

  	socket.on('offer', function (offerData) {
  			console.log("RECIEVING OFFER:", offerData)
  		peer.signal(JSON.parse(offerData));
  	});

  	socket.on('answer', function (answerData) {
  			console.log("RECIEVING ANSWER:", answerData)
  		peer.signal(JSON.parse(answerData));
      console.log('PEER AFTER ANSWER', peer);
  	});


    peer.on('track', (stream, track) => {
  //    // got remote video stream, now let's show it in a video tag
  // //     var video = document.getElementById('incomingVideo');
  // //     console.log(video);
  // //     if ('srcObject' in video) {
  // //       video.srcObject = stream;
  // //     } else {
  // //       video.src = window.URL.createObjectURL(stream); // for older browsers
  // //     }
  // //
  // //     video.play();
      console.log('STREAMING');
      let audio = new Audio();
      window.stream = stream;
      audio.srcObject = stream;
      audio.play();

    });


  	// Called upon successful connection- YAY!
  	peer.on('connect', () => {
  		console.log("CONNECTED TO PEER");
  		let mediaStream = navigator.mediaDevices.getUserMedia({audio: true, video: false});
  		mediaStream.then(function(stream) {
  			// socket.emit('peerConnect');

        console.log('IN MEDIA STREAM', stream)
        console.log('TRACK', stream.getTracks());
  			// peer.addStream(stream);
        peer.addTrack(stream.getTracks()[0], stream);

        console.log(peer);
        if (isInitiator) peer.send('hey peer2, how is it going?');

  			// setTimeout(function(){
  				
  			// // 	// setupCallCell();
  				
  			// }, 2000);
  		}).catch(function(e) {
  			console.log(e);
  			console.log("USER MUST ALLOW VOICE AND VIDEO");
  		});

  	});


    peer.on('error', err => console.error('error', err))

  	peer.on('close', () => {
  		console.log("DISCONNECTED FROM PEER");

  //			socket.emit('peerDisconnect', msg);
  	});

  	peer.on('data', data => {
  		console.log('data: ' + data);
  	});
  // //	}).catch(function(e) {
  // //		console.log(e);
  // //		alert("USER MUST ALLOW VOICE AND VIDEO");
  // //	});

	});






}