//
//  EventNotifier.swift
//  luttrellMusic
//
//  Created by Michael Luttrell on 5/20/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

import Foundation
//import RCTBridge
//import RCTEventDispatcher

@objc(EventNotifier)
class EventNotifier: NSObject {
  
  var rctBridge:RCTBridge?
  
//  let rctEventDispatcher = RCTEventDispatcher()

  init(rctBridge:RCTBridge){
    self.rctBridge = rctBridge
  }

  func initWithBridge(rctBridge:RCTBridge){
    self.rctBridge = rctBridge
  }
  
  func sendLoading(title:String){
    rctBridge?.eventDispatcher?.sendAppEventWithName("Loading", body: title)
  }
  
//  var bridge = RCTBridge._bridge;
  
}
//  @implementation CalendarManager
//
//  @synthesize bridge = _bridge;
//
//  - (void)calendarEventReminderReceived:(NSNotification *)notification
//  {
//  NSString *eventName = notification.userInfo[@"name"];
//  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
//  body:@{@"name": eventName}];
//  }
//
//  @end
