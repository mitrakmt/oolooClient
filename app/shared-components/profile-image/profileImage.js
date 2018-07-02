import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import PhotoUpload from 'react-native-photo-upload'
import AWS from 'aws-sdk'

class ProfileImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: '',
    }
  }

  componentWillMount() {
    // this.downloadPhoto() todo: uncomment
  }

  uploadPhoto = base64 => {
    const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com')
    const s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: 'TJ2AND80F9JYJ3TZEGS8',
      secretAccessKey: 'zSo2XIrlTWAaYGFLkTAcw6A8d8BbciQJShPtV2Y7',
    })
    const params = {
      Bucket: 'ooloo-profile-images',
      // Key: this.props.userId.toString(), TODO: get real id!
      body: base64,
    }
    // const thisContext = this
    s3.upload(params, {}, err => {
      if (!err) {
        console.log('params', params)
        // thisContext.setState({
        //   profileImage:
        // })
      } else {
        console.log(err) // an error occurred
      }
    })
  }

  downloadPhoto = () => {
    const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com')
    const s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: 'TJ2AND80F9JYJ3TZEGS8',
      secretAccessKey: 'zSo2XIrlTWAaYGFLkTAcw6A8d8BbciQJShPtV2Y7',
    })
    const params = {
      Bucket: 'ooloo-profile-images',
      // Key: this.props.userId.toString(), Todo: GET REAL ID
    }
    const thisContext = this

    s3.getObject(params, err => {
      if (!err) {
        // const url = window.URL || window.webkitURL
        // const profileImage = new Blob([new Uint8Array(data.Body)])
        // const imageSrc = url.createObjectURL(profileImage)
        // thisContext.setState({
        //   profileImage: imageSrc,
        // })
      } else {
        thisContext.setState({
          profileImage: '',
        })
      }
    })
  }

  deleteProfileImage = () => {
    const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com')
    const s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: 'TJ2AND80F9JYJ3TZEGS8',
      secretAccessKey: 'zSo2XIrlTWAaYGFLkTAcw6A8d8BbciQJShPtV2Y7',
    })
    const params = {
      Bucket: 'ooloo-profile-images',
      // Key: this.props.userId.toString(), // todo: get real id
    }
    const thisContext = this

    s3.deleteObject(params, err => {
      if (!err) {
        thisContext.setState({
          profileImage: '',
        })
      } else {
        console.log(err) // an error ocurred
      }
    })
  }

  uploadImage = base64 => {
    this.downloadPhoto(base64)
  }

  render() {
    return (
      <View>
        <PhotoUpload
          onPhotoSelect={avatar => {
            if (avatar) {
              console.log('Image base64 string: ', avatar)
            }
          }}
        >
          <Image
            style={{
              paddingVertical: 30,
              width: 100,
              height: 100,
              borderRadius: 50,
              marginTop: 70,
            }}
            photoPickerTitle="Upload Profile Image"
            resizeMode="cover"
            source={{
              uri: this.state.profileImage,
            }}
            onPhotoSelect={base64 => this.uploadPhoto(base64)}
          />
        </PhotoUpload>
      </View>
    )
  }
}

function mapStateToProps() {
  return {}
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileImage)
