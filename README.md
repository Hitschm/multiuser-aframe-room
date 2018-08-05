
# Project Description

## A-Frame Networked-Physics-Playground

*by Jan Azzati (@protyze)
and Christian Schaer (@chrisschaer)*

- Synced physics accross multiple clients using WebRTC.
- Physics are synced in realtime with snapshots and interpolated on each client between the snapshots (different interpolation strategies for different states).
- Throwing things at each other creates believable and predictable physics behaviour so that the remote user can catch things mid-air.
- Objects can be touched, grabbed and manipulated by multiple players simultaneously while maintaining realistic and believable physics behabiour.
- Color of object indicates the current owner (client). Physics behaviour of that object is at that point only calculated on local client and snapshots are broadcasted to the other clients in order to interpolate (Altough the other clients will always maintain physics characteristics for each entity – allowing them to touch/grab/manipulate them at any time). The local physics system on all clients still keeps track of all collisions and takes over an object if needed.
- Soft shadows and a grabbable point light showcase what can be done in terms of realtime shadows with A-Frame. 

**Special thanks to:**
- A-Frame. https://aframe.io/
- networked-aframe by Hayden Lee. https://github.com/haydenjameslee/networked-aframe
- aframe-physics-system by Don McCurdy (based on CANNON.js). https://github.com/haydenjameslee/networked-aframe
- and many other contributors to the A-Frame community

Our development has been done within a fork of networked-aframe: https://github.com/protyze/networked-aframe and is planned to be contributed to the original networked-aframe component within the next releases.

--------------------------------------------------------

--> Email an Ada:

To: ada.edwards@samsung.com
Subject: “vrtogether, aframe-networked-physics-playground by Jan Azzati and Christian Schaer”

Hi Ada

We'd like to submit our project called «aframe-networked-physics-playground» to the virtual hackathon. We've worked on it in the past few weeks during the hackathon. Our project basically allows multiple users to play around with physics objects together (e.g. throw and catch things, touch and manipulate things, play baseball, etc...) and it pushes the limits of what can be done in WebVR using both physics behaviour and network syncing over multiple clients. It makes use of WebRTC to both transmit data directly between clients (p2p) and to allow for voice chat.

Please read more in the README of our Glitch Project which we would like to submit:
[LINK]

or see a preview here:
https://twitter.com/protyze/status/879105086726778880

It runs best in Firefox Nigthly or Chromium using the HTC Vive. There should however be no problem using an Oculus Rift. Mobile support with an interaction model could be added later, it's however possible to observe the scene on a mobile device even at this point.

We are planning to add more avatars over time and allow everyone to choose the one they like before entering the room. At the moment everyone is dropped into the same room, so performance could become a problem when larger groups of people enter at the same time. We're also working on solutions on that front.

Looking forward to hearing from you and seeing all the other projects!

=======
