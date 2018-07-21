import React, { Component } from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

class ProfileImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: '',
    }
  }

  componentWillMount() {
    this.downloadPhoto(this.props.id)
  }

  downloadPhoto = id => {
    if (!id) {
      this.setState({
        profileImage:
          'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg',
      })
      return
    }
    const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com')
    const s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: 'TJ2AND80F9JYJ3TZEGS8',
      secretAccessKey: 'zSo2XIrlTWAaYGFLkTAcw6A8d8BbciQJShPtV2Y7',
    })
    const params = {
      Bucket: 'ooloo-profile-images',
      Key: id.toString(),
    }
    const thisContext = this

    s3.getObject(params, (err, data) => {
      if (!err) {
        const encoded = `data:image/gif;base64,${data.Body}`
        thisContext.setState({
          profileImage: encoded,
        })
      }
    })
  }

  render() {
    return (
      <Image
        style={this.props.style}
        containerStyle={this.props.style}
        source={{
          uri: this.state.profileImage
            ? this.state.profileImage
            : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg',
        }}
      />
    )
  }
}

ProfileImage.propTypes = {
  id: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
}

export default ProfileImage
