export type PhotoListResp = {
  data: Photo[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type Photo = {
  id: number
  attributes: {
    alt: string
    [key: string]: unknown
    img: {
      data: {
        [key: string]: unknown
        attributes: {
          url: string
          [key: string]: unknown
          formats: {
            small?: {
              url: string
              [key: string]: unknown
            }
            medium?: {
              url: string
              [key: string]: unknown
            }
            large?: {
              url: string
              [key: string]: unknown
            }
            thumbnail?: {
              url: string
              [key: string]: unknown
            }
          }
        }
      }
    }
  }
}

export const photoListStatic: PhotoListResp = {
  data: [
    {
      id: 36,
      attributes: {
        createdAt: '2024-02-21T01:30:27.749Z',
        updatedAt: '2024-02-21T02:19:50.412Z',
        publishedAt: '2024-02-21T02:19:50.403Z',
        alt: 'Organizers',
        img: {
          data: {
            id: 42,
            attributes: {
              name: '2024.webp',
              alternativeText: null,
              caption: null,
              width: 3000,
              height: 1810,
              formats: {
                large: {
                  ext: '.webp',
                  url: '/photos/gallery/large_2024_29e331fb60.webp',
                  hash: 'large_2024_29e331fb60',
                  mime: 'image/webp',
                  name: 'large_2024.webp',
                  path: null,
                  size: 54.52,
                  width: 1000,
                  height: 603,
                },
              },
              hash: '2024_29e331fb60',
              ext: '.webp',
              mime: 'image/webp',
              size: 256.77,
              url: '/photos/gallery/2024_29e331fb60.webp',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:30:20.052Z',
              updatedAt: '2024-02-21T01:30:20.052Z',
            },
          },
        },
      },
    },
    {
      id: 43,
      attributes: {
        createdAt: '2024-02-21T02:19:12.374Z',
        updatedAt: '2024-02-21T02:19:13.154Z',
        publishedAt: '2024-02-21T02:19:13.149Z',
        alt: 'Glow',
        img: {
          data: {
            id: 49,
            attributes: {
              name: 'IMG_0917.jpg',
              alternativeText: null,
              caption: null,
              width: 5013,
              height: 3534,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_IMG_0917_da6be4e9af.jpg',
                  hash: 'large_IMG_0917_da6be4e9af',
                  mime: 'image/jpeg',
                  name: 'large_IMG_0917.jpg',
                  path: null,
                  size: 131.04,
                  width: 1000,
                  height: 705,
                },
              },
              hash: 'IMG_0917_da6be4e9af',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 2116.56,
              url: '/photos/gallery/IMG_0917_da6be4e9af.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T02:19:05.968Z',
              updatedAt: '2024-02-21T02:19:05.968Z',
            },
          },
        },
      },
    },
    {
      id: 18,
      attributes: {
        createdAt: '2024-02-21T01:14:56.379Z',
        updatedAt: '2024-02-21T02:15:15.911Z',
        publishedAt: '2024-02-21T02:15:15.822Z',
        alt: 'Dare to Glow',
        img: {
          data: {
            id: 23,
            attributes: {
              name: 'DSC02236.jpg',
              alternativeText: null,
              caption: null,
              width: 2061,
              height: 1699,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02236_1f7d488f46.jpg',
                  hash: 'large_DSC_02236_1f7d488f46',
                  mime: 'image/jpeg',
                  name: 'large_DSC02236.jpg',
                  path: null,
                  size: 24.98,
                  width: 1000,
                  height: 824,
                },
              },
              hash: 'DSC_02236_1f7d488f46',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 62.84,
              url: '/photos/gallery/DSC_02236_1f7d488f46.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:14:37.971Z',
              updatedAt: '2024-02-21T01:14:37.971Z',
            },
          },
        },
      },
    },
    {
      id: 42,
      attributes: {
        createdAt: '2024-02-21T02:13:25.642Z',
        updatedAt: '2024-02-21T02:13:26.369Z',
        publishedAt: '2024-02-21T02:13:26.354Z',
        alt: 'Drinks Bar',
        img: {
          data: {
            id: 48,
            attributes: {
              name: 'DSC02187.jpg',
              alternativeText: null,
              caption: null,
              width: 2791,
              height: 4052,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02187_341269583c.jpg',
                  hash: 'large_DSC_02187_341269583c',
                  mime: 'image/jpeg',
                  name: 'large_DSC02187.jpg',
                  path: null,
                  size: 104.55,
                  width: 689,
                  height: 1000,
                },
              },
              hash: 'DSC_02187_341269583c',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 1060.46,
              url: '/photos/gallery/DSC_02187_341269583c.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T02:13:16.118Z',
              updatedAt: '2024-02-21T02:13:16.118Z',
            },
          },
        },
      },
    },
    {
      id: 20,
      attributes: {
        createdAt: '2024-02-21T01:16:09.436Z',
        updatedAt: '2024-02-21T02:08:27.098Z',
        publishedAt: '2024-02-21T02:08:27.091Z',
        alt: 'Hackers',
        img: {
          data: {
            id: 32,
            attributes: {
              name: 'DSC02938.jpg',
              alternativeText: null,
              caption: null,
              width: 2693,
              height: 3739,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02938_5e4843b993.jpg',
                  hash: 'large_DSC_02938_5e4843b993',
                  mime: 'image/jpeg',
                  name: 'large_DSC02938.jpg',
                  path: null,
                  size: 103.17,
                  width: 720,
                  height: 1000,
                },
              },
              hash: 'DSC_02938_5e4843b993',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 948.91,
              url: '/photos/gallery/DSC_02938_5e4843b993.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:15:01.451Z',
              updatedAt: '2024-02-21T01:15:01.451Z',
            },
          },
        },
      },
    },
    {
      id: 29,
      attributes: {
        createdAt: '2024-02-21T01:20:33.641Z',
        updatedAt: '2024-02-21T02:08:22.234Z',
        publishedAt: '2024-02-21T02:08:22.227Z',
        alt: 'Presenter',
        img: {
          data: {
            id: 34,
            attributes: {
              name: 'DSC02405.jpg',
              alternativeText: null,
              caption: null,
              width: 2362,
              height: 3660,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02405_a8f8892bec.jpg',
                  hash: 'large_DSC_02405_a8f8892bec',
                  mime: 'image/jpeg',
                  name: 'large_DSC02405.jpg',
                  path: null,
                  size: 85.18,
                  width: 645,
                  height: 1000,
                },
              },
              hash: 'DSC_02405_a8f8892bec',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 1428.35,
              url: '/photos/gallery/DSC_02405_a8f8892bec.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:20:06.624Z',
              updatedAt: '2024-02-21T01:20:24.797Z',
            },
          },
        },
      },
    },
    {
      id: 24,
      attributes: {
        createdAt: '2024-02-21T01:17:57.535Z',
        updatedAt: '2024-02-21T02:08:16.254Z',
        publishedAt: '2024-02-21T02:08:16.249Z',
        alt: 'Hackers',
        img: {
          data: {
            id: 28,
            attributes: {
              name: 'DSC02684.jpg',
              alternativeText: null,
              caption: null,
              width: 3072,
              height: 4007,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02684_7c6b7c4531.jpg',
                  hash: 'large_DSC_02684_7c6b7c4531',
                  mime: 'image/jpeg',
                  name: 'large_DSC02684.jpg',
                  path: null,
                  size: 81.07,
                  width: 767,
                  height: 1000,
                },
              },
              hash: 'DSC_02684_7c6b7c4531',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 590.85,
              url: '/photos/gallery/DSC_02684_7c6b7c4531.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:14:57.772Z',
              updatedAt: '2024-02-21T01:14:57.772Z',
            },
          },
        },
      },
    },
    {
      id: 22,
      attributes: {
        createdAt: '2024-02-21T01:16:41.989Z',
        updatedAt: '2024-02-21T02:07:11.852Z',
        publishedAt: '2024-02-21T02:07:11.845Z',
        alt: 'Hackers',
        img: {
          data: {
            id: 30,
            attributes: {
              name: 'DSC02481.jpg',
              alternativeText: null,
              caption: null,
              width: 3072,
              height: 3470,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02481_e4a7fcd682.jpg',
                  hash: 'large_DSC_02481_e4a7fcd682',
                  mime: 'image/jpeg',
                  name: 'large_DSC02481.jpg',
                  path: null,
                  size: 98.31,
                  width: 885,
                  height: 1000,
                },
              },
              hash: 'DSC_02481_e4a7fcd682',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 894.88,
              url: '/photos/gallery/DSC_02481_e4a7fcd682.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:14:59.171Z',
              updatedAt: '2024-02-21T01:14:59.171Z',
            },
          },
        },
      },
    },
    {
      id: 28,
      attributes: {
        createdAt: '2024-02-21T01:18:50.446Z',
        updatedAt: '2024-02-21T02:07:05.483Z',
        publishedAt: '2024-02-21T02:07:05.477Z',
        alt: 'Bubble Tea',
        img: {
          data: {
            id: 24,
            attributes: {
              name: 'DSC02158.jpg',
              alternativeText: null,
              caption: null,
              width: 2203,
              height: 3217,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02158_213649c32a.jpg',
                  hash: 'large_DSC_02158_213649c32a',
                  mime: 'image/jpeg',
                  name: 'large_DSC02158.jpg',
                  path: null,
                  size: 70.02,
                  width: 685,
                  height: 1000,
                },
              },
              hash: 'DSC_02158_213649c32a',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 370.83,
              url: '/photos/gallery/DSC_02158_213649c32a.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:14:53.083Z',
              updatedAt: '2024-02-21T01:14:53.083Z',
            },
          },
        },
      },
    },
    {
      id: 40,
      attributes: {
        createdAt: '2024-02-21T01:50:58.835Z',
        updatedAt: '2024-02-21T02:06:48.224Z',
        publishedAt: '2024-02-21T02:06:48.217Z',
        alt: 'VR',
        img: {
          data: {
            id: 46,
            attributes: {
              name: 'DSC02798.jpg',
              alternativeText: null,
              caption: null,
              width: 2883,
              height: 4150,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02798_3e67d1d999.jpg',
                  hash: 'large_DSC_02798_3e67d1d999',
                  mime: 'image/jpeg',
                  name: 'large_DSC02798.jpg',
                  path: null,
                  size: 59.46,
                  width: 694,
                  height: 1000,
                },
              },
              hash: 'DSC_02798_3e67d1d999',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 514.53,
              url: '/photos/gallery/DSC_02798_3e67d1d999.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:50:52.465Z',
              updatedAt: '2024-02-21T01:50:52.465Z',
            },
          },
        },
      },
    },
    {
      id: 38,
      attributes: {
        createdAt: '2024-02-21T01:47:19.703Z',
        updatedAt: '2024-02-21T02:06:32.196Z',
        publishedAt: '2024-02-21T02:06:32.191Z',
        alt: 'Power Couple',
        img: {
          data: {
            id: 44,
            attributes: {
              name: '_DSC2318.jpg',
              alternativeText: null,
              caption: null,
              width: 3810,
              height: 5201,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_2318_503e616005.jpg',
                  hash: 'large_DSC_2318_503e616005',
                  mime: 'image/jpeg',
                  name: 'large__DSC2318.jpg',
                  path: null,
                  size: 94.99,
                  width: 732,
                  height: 1000,
                },
              },
              hash: 'DSC_2318_503e616005',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 1400.62,
              url: '/photos/gallery/DSC_2318_503e616005.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:47:11.435Z',
              updatedAt: '2024-02-21T01:47:11.435Z',
            },
          },
        },
      },
    },
    {
      id: 19,
      attributes: {
        createdAt: '2024-02-21T01:15:53.777Z',
        updatedAt: '2024-02-21T02:05:56.325Z',
        publishedAt: '2024-02-21T02:05:56.320Z',
        alt: 'Medal',
        img: {
          data: {
            id: 33,
            attributes: {
              name: 'DSC02993.jpg',
              alternativeText: null,
              caption: null,
              width: 4608,
              height: 3072,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02993_26dbd3d13d.jpg',
                  hash: 'large_DSC_02993_26dbd3d13d',
                  mime: 'image/jpeg',
                  name: 'large_DSC02993.jpg',
                  path: null,
                  size: 55.89,
                  width: 1000,
                  height: 667,
                },
              },
              hash: 'DSC_02993_26dbd3d13d',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 965.1,
              url: '/photos/gallery/DSC_02993_26dbd3d13d.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:15:01.539Z',
              updatedAt: '2024-02-21T01:15:45.524Z',
            },
          },
        },
      },
    },
    {
      id: 41,
      attributes: {
        createdAt: '2024-02-21T01:54:04.641Z',
        updatedAt: '2024-02-21T02:05:42.303Z',
        publishedAt: '2024-02-21T02:05:42.296Z',
        alt: 'Food',
        img: {
          data: {
            id: 47,
            attributes: {
              name: 'DSC02372.jpg',
              alternativeText: null,
              caption: null,
              width: 3072,
              height: 4608,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02372_3e686ce3a2.jpg',
                  hash: 'large_DSC_02372_3e686ce3a2',
                  mime: 'image/jpeg',
                  name: 'large_DSC02372.jpg',
                  path: null,
                  size: 98.64,
                  width: 667,
                  height: 1000,
                },
              },
              hash: 'DSC_02372_3e686ce3a2',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 1225.95,
              url: '/photos/gallery/DSC_02372_3e686ce3a2.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:53:58.550Z',
              updatedAt: '2024-02-21T01:53:58.550Z',
            },
          },
        },
      },
    },
    {
      id: 30,
      attributes: {
        createdAt: '2024-02-21T01:21:17.135Z',
        updatedAt: '2024-02-21T02:05:28.513Z',
        publishedAt: '2024-02-21T02:05:28.501Z',
        alt: 'Bar Menu',
        img: {
          data: {
            id: 35,
            attributes: {
              name: 'DSC02254.jpg',
              alternativeText: null,
              caption: null,
              width: 3072,
              height: 4608,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02254_a34ea72c91.jpg',
                  hash: 'large_DSC_02254_a34ea72c91',
                  mime: 'image/jpeg',
                  name: 'large_DSC02254.jpg',
                  path: null,
                  size: 70.24,
                  width: 667,
                  height: 1000,
                },
              },
              hash: 'DSC_02254_a34ea72c91',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 1004.63,
              url: '/photos/gallery/DSC_02254_a34ea72c91.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:21:10.688Z',
              updatedAt: '2024-02-21T01:21:10.688Z',
            },
          },
        },
      },
    },
    {
      id: 25,
      attributes: {
        createdAt: '2024-02-21T01:18:12.358Z',
        updatedAt: '2024-02-21T02:05:20.409Z',
        publishedAt: '2024-02-21T02:05:20.402Z',
        alt: 'Hackers',
        img: {
          data: {
            id: 27,
            attributes: {
              name: 'DSC02757.jpg',
              alternativeText: null,
              caption: null,
              width: 2582,
              height: 4102,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02757_cf95f1447e.jpg',
                  hash: 'large_DSC_02757_cf95f1447e',
                  mime: 'image/jpeg',
                  name: 'large_DSC02757.jpg',
                  path: null,
                  size: 79.41,
                  width: 629,
                  height: 1000,
                },
              },
              hash: 'DSC_02757_cf95f1447e',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 700.03,
              url: '/photos/gallery/DSC_02757_cf95f1447e.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:14:57.473Z',
              updatedAt: '2024-02-21T01:14:57.473Z',
            },
          },
        },
      },
    },
    {
      id: 34,
      attributes: {
        createdAt: '2024-02-21T01:26:20.883Z',
        updatedAt: '2024-02-21T02:04:41.594Z',
        publishedAt: '2024-02-21T02:04:41.587Z',
        alt: 'Organizers',
        img: {
          data: {
            id: 39,
            attributes: {
              name: 'DSC02820.jpg',
              alternativeText: null,
              caption: null,
              width: 4608,
              height: 3072,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02820_b00cf242a5.jpg',
                  hash: 'large_DSC_02820_b00cf242a5',
                  mime: 'image/jpeg',
                  name: 'large_DSC02820.jpg',
                  path: null,
                  size: 127.76,
                  width: 1000,
                  height: 667,
                },
              },
              hash: 'DSC_02820_b00cf242a5',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 1729.92,
              url: '/photos/gallery/DSC_02820_b00cf242a5.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:26:14.922Z',
              updatedAt: '2024-02-21T01:26:14.922Z',
            },
          },
        },
      },
    },
    {
      id: 37,
      attributes: {
        createdAt: '2024-02-21T01:44:53.615Z',
        updatedAt: '2024-02-21T02:04:10.813Z',
        publishedAt: '2024-02-21T02:04:10.721Z',
        alt: 'Hacker',
        img: {
          data: {
            id: 43,
            attributes: {
              name: 'DSC02126.jpg',
              alternativeText: null,
              caption: null,
              width: 1919,
              height: 3328,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02126_01a1b8764f.jpg',
                  hash: 'large_DSC_02126_01a1b8764f',
                  mime: 'image/jpeg',
                  name: 'large_DSC02126.jpg',
                  path: null,
                  size: 51.58,
                  width: 576,
                  height: 1000,
                },
              },
              hash: 'DSC_02126_01a1b8764f',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 287.91,
              url: '/photos/gallery/DSC_02126_01a1b8764f.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:44:48.310Z',
              updatedAt: '2024-02-21T01:44:48.310Z',
            },
          },
        },
      },
    },
    {
      id: 21,
      attributes: {
        createdAt: '2024-02-21T01:16:28.491Z',
        updatedAt: '2024-02-21T02:03:45.185Z',
        publishedAt: '2024-02-21T02:03:45.181Z',
        alt: 'MLH',
        img: {
          data: {
            id: 31,
            attributes: {
              name: 'DSC02062.jpg',
              alternativeText: null,
              caption: null,
              width: 2693,
              height: 4150,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02062_4f050471fd.jpg',
                  hash: 'large_DSC_02062_4f050471fd',
                  mime: 'image/jpeg',
                  name: 'large_DSC02062.jpg',
                  path: null,
                  size: 118.62,
                  width: 649,
                  height: 1000,
                },
              },
              hash: 'DSC_02062_4f050471fd',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 953.52,
              url: '/photos/gallery/DSC_02062_4f050471fd.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:15:00.471Z',
              updatedAt: '2024-02-21T01:16:19.466Z',
            },
          },
        },
      },
    },
    {
      id: 27,
      attributes: {
        createdAt: '2024-02-21T01:18:37.913Z',
        updatedAt: '2024-02-21T02:03:14.890Z',
        publishedAt: '2024-02-21T02:03:14.882Z',
        alt: 'Judging',
        img: {
          data: {
            id: 25,
            attributes: {
              name: 'DSC02671.jpg',
              alternativeText: null,
              caption: null,
              width: 2742,
              height: 4073,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_02671_11e286d794.jpg',
                  hash: 'large_DSC_02671_11e286d794',
                  mime: 'image/jpeg',
                  name: 'large_DSC02671.jpg',
                  path: null,
                  size: 53.66,
                  width: 673,
                  height: 1000,
                },
              },
              hash: 'DSC_02671_11e286d794',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 388.06,
              url: '/photos/gallery/DSC_02671_11e286d794.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:14:53.671Z',
              updatedAt: '2024-02-21T01:14:53.671Z',
            },
          },
        },
      },
    },
    {
      id: 33,
      attributes: {
        createdAt: '2024-02-21T01:24:51.634Z',
        updatedAt: '2024-02-21T02:02:47.204Z',
        publishedAt: '2024-02-21T02:02:47.164Z',
        alt: 'Shirts',
        img: {
          data: {
            id: 38,
            attributes: {
              name: '_DSC2276.jpg',
              alternativeText: null,
              caption: null,
              width: 6000,
              height: 4000,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_2276_e7d4ce8571.jpg',
                  hash: 'large_DSC_2276_e7d4ce8571',
                  mime: 'image/jpeg',
                  name: 'large__DSC2276.jpg',
                  path: null,
                  size: 79.99,
                  width: 1000,
                  height: 667,
                },
              },
              hash: 'DSC_2276_e7d4ce8571',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 3919.28,
              url: '/photos/gallery/DSC_2276_e7d4ce8571.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:24:43.579Z',
              updatedAt: '2024-02-21T01:24:43.579Z',
            },
          },
        },
      },
    },
    {
      id: 32,
      attributes: {
        createdAt: '2024-02-21T01:22:52.422Z',
        updatedAt: '2024-02-21T02:01:54.055Z',
        publishedAt: '2024-02-21T02:01:54.050Z',
        alt: 'Hackers',
        img: {
          data: {
            id: 37,
            attributes: {
              name: '_DSC2072.jpg',
              alternativeText: null,
              caption: null,
              width: 4000,
              height: 6000,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_2072_66f06df237.jpg',
                  hash: 'large_DSC_2072_66f06df237',
                  mime: 'image/jpeg',
                  name: 'large__DSC2072.jpg',
                  path: null,
                  size: 118.9,
                  width: 667,
                  height: 1000,
                },
              },
              hash: 'DSC_2072_66f06df237',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 2396.1,
              url: '/photos/gallery/DSC_2072_66f06df237.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:22:46.267Z',
              updatedAt: '2024-02-21T01:22:46.267Z',
            },
          },
        },
      },
    },
    {
      id: 31,
      attributes: {
        createdAt: '2024-02-21T01:21:59.417Z',
        updatedAt: '2024-02-21T02:00:53.872Z',
        publishedAt: '2024-02-21T02:00:53.867Z',
        alt: 'Deer',
        img: {
          data: {
            id: 36,
            attributes: {
              name: '_DSC2171.jpg',
              alternativeText: null,
              caption: null,
              width: 2992,
              height: 5238,
              formats: {
                large: {
                  ext: '.jpg',
                  url: '/photos/gallery/large_DSC_2171_80c67cefca.jpg',
                  hash: 'large_DSC_2171_80c67cefca',
                  mime: 'image/jpeg',
                  name: 'large__DSC2171.jpg',
                  path: null,
                  size: 139.04,
                  width: 571,
                  height: 1000,
                },
              },
              hash: 'DSC_2171_80c67cefca',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 1996.58,
              url: '/photos/gallery/DSC_2171_80c67cefca.jpg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2024-02-21T01:21:55.512Z',
              updatedAt: '2024-02-21T01:21:55.512Z',
            },
          },
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 100,
      pageCount: 1,
      total: 22,
    },
  },
}
