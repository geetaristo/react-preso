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
      //    var songFileName = url.lastPathComponent // we'll use this to save our file information
      let audioFile = NSURL(string: url)!
      let request = NSURLRequest(URL: audioFile)
      
      
      NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
        if error != nil {
          loadedCallback(["error"])
        }
        
        do {
          try self.audioPlayer = AVAudioPlayer(data: data!, fileTypeHint: nil)
        } catch {
          print("can not create audio player, yo?")
        }
        
        
        if let player = self.audioPlayer {
          player.delegate = self;
          player.prepareToPlay()
          player.play()
          loadedCallback([title])
          
        } else {
          print("Error attempting to play file: \(url). Possibly no internet connection")
        }
      }
      
  }
  
  @objc func stopPlayer() -> Void {
    if let player = self.audioPlayer {
      player.stop()
    }
  }
  
  @objc func audioPlayerDidFinishPlaying(_: AVAudioPlayer, successfully: Bool) {
    print("audio player finished playing")
    
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
