/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
//#import <UserNotifications/UserNotifications.h>
#import <PushKit/PushKit.h>

#import "mediatest-Swift.h"

@interface AppDelegate ()
@property (nonatomic, strong) CallManager *callManager;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSLog(@"didFinishLaunchingWithOptions");
  
//  NSURL *jsCodeLocation;
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//  _bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation moduleProvider:nil launchOptions:launchOptions];
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_bridge moduleName:@"mediatest" initialProperties:nil];
//
//
//  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"mediatest"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  PKPushRegistry *pushRegistry;
  pushRegistry = [[PKPushRegistry alloc] initWithQueue:dispatch_get_main_queue()];
  pushRegistry.delegate = self;
  pushRegistry.desiredPushTypes = [NSSet setWithObject:PKPushTypeVoIP];
  
  _callManager = [[CallManager alloc]init];
  [_callManager requestAuthorization:application appDelegate:self];
  
  return YES;
}

#define PushKit Delegate Methods

- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(NSString *)type {
  [_callManager didUpdatePushCredentials:[credentials token]];
}

- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(NSString *)type {
  [_callManager didReceiveIncomingPushWith:payload.dictionaryPayload];
}

@end
