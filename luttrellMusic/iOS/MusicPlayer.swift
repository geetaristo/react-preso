//
//  PlayMusic.swift
//  luttrellMusic
//
//  Created by Michael Luttrell on 5/20/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

import Foundation
import AVFoundation


@objc(MusicPlayer)
class MusicPlayer : NSObject, AVAudioPlayerDelegate {

  var audioPlayer:AVAudioPlayer? = nil
  var donePlaying: RCTResponseSenderBlock? = nil
  var title:String? = nil
  
  override init(){
  }

  
  @objc func playSong(title: String,
                      url: String,
                      loadedCallback: RCTResponseSenderBlock,
                      donePlaying: RCTResponseSenderBlock) -> Void {

    // save the callback and the title for done playing
    self.donePlaying = donePlaying
    self.title = title
    var songFileName = url.lastPathComponent // we'll use this to save our file information
    var audioFile = NSURL(string: url)!
    let request = NSURLRequest(URL: audioFile)

    
    NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
      if error != nil {
        loadedCallback(["error"])
      }

      self.audioPlayer = AVAudioPlayer(data: data, error: nil)
      
      println("Received data, preparing to play \(data.length) bytes")
      if let player = self.audioPlayer {
        player.prepareToPlay()
        player.play()
        loadedCallback([title])
        player.delegate = self;
      } else {
        println("Error attempting to play file: \(url). Possibly no internet connection")
      }
    }

  }

  @objc func stopPlayer() -> Void {
    if let player = self.audioPlayer {
      player.stop()
    }
  }
  
  @objc func audioPlayerDidFinishPlaying(AVAudioPlayer!, successfully: Bool) {
    println("audio player finished playing")
    
//    if let donePlaying = self.donePlaying {
//      donePlaying([self.title!])
//    }
  }
  
}






//  func saveFile(data: NSData){
//    let filemgr = NSFileManager.defaultManager()
//    let currentPath = filemgr.currentDirectoryPath
//    println("current path is \(currentPath)")
//    var error:NSError? = nil
//    let filelist = filemgr.contentsOfDirectoryAtPath("/", error: &error)
//    
//    for filename in filelist! {
//      println(filename)
//    }
//  }
//  
//  func loadLocalFile(fileName:String) -> NSData {
//    return NSData()
//  }
//
