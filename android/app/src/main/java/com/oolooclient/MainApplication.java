package com.oolooclient;

import android.app.Application;

import com.facebook.react.ReactApplication;
import rnsoundplayer.RNSoundPlayerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.keychain.KeychainPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPlayerPackage(),
            new RNSoundPackage(),
            new RNImgToBase64Package(),
            new RNFSPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new SvgPackage(),
            new GoogleAnalyticsBridgePackage(),
            new VectorIconsPackage(),
            new KeychainPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
