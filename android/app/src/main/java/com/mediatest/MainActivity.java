package com.mediatest;

import android.os.Bundle;
import android.view.WindowManager;
import com.facebook.react.ReactActivity;

/**
 * See https://cmichel.io/how-to-set-initial-props-in-react-native/ to know how to get the data from a receiving call.
 */
public class MainActivity extends ReactActivity
{
    // ATRIBUTES ===================================================================================

    // CONSTRUCTOR =================================================================================

    // METHODS =====================================================================================

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "mediatest";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        /**
         * MainActivity permission to show when the device is locked.
         */
        getWindow().addFlags(
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON |
                WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON);
        super.onCreate(savedInstanceState);
    }

    // SEND EVENT ==================================================================================

    // CLASS =======================================================================================

}
