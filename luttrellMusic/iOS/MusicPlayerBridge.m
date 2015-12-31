//
//  MusicPlayerBridge.m
//  luttrellMusic
//
//  Created by Michael Luttrell on 9/19/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MusicPlayer, NSObject)

RCT_EXTERN_METHOD(playSong:(NSString *)title url:(NSString *) url  loadedCallback:(RCTResponseSenderBlock)loadedCallback donePlaying:(RCTResponseSenderBlock)donePlaying)
RCT_EXTERN_METHOD(stopPlayer)

@end