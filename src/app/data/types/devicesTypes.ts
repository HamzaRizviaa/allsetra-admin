export interface IDevices {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  name: string;
  uniqueId: string;
  deviceType: {
    createdBy: string;
    created: string;
    updatedBy: string;
    lastUpdated: string;
    deletedBy: string;
    deleted: string;
    isDeleted: boolean;
    uniqueId: string;
    name: string;
    deviceManufacturerId: string;
    deviceManufacturer: {
      createdBy: string;
      created: string;
      updatedBy: string;
      lastUpdated: string;
      deletedBy: string;
      deleted: string;
      isDeleted: boolean;
      uniqueId: string;
      manufacturerName: string;
    };
    connectivity: number;
    supportsCAN: boolean;
    imageURL: string;
    deviceManufacturerName: string;
    deviceProfiles: [
      {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        uniqueId: string;
        profileName: string;
        description: string;
        deviceTypeId: string;
        configurations: [
          {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            uniqueId: string;
            configurationName: string;
            profileConfigurationType: number;
          }
        ];
      }
    ];
    deviceTypePictures: [
      {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        id: number;
        fileName: string;
        url: string;
        uniqueId: string;
      }
    ];
    deviceModules: [
      {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        uniqueId: string;
        moduleName: string;
        isRequired: boolean;
      }
    ];
    fields: [
      {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        id: number;
        label: string;
        isRequired: boolean;
        fieldType: number;
        maxLength: number;
        onlyNumbers: boolean;
        uniqueId: string;
      }
    ];
    fieldsCount: number;
  };
  object: {
    createdBy: string;
    created: string;
    updatedBy: string;
    lastUpdated: string;
    deletedBy: string;
    deleted: string;
    isDeleted: boolean;
    name: string;
    uniqueId: string;
    location: {
      locationProvider: {
        locationType: number;
        provider: string;
      };
      latitude: number;
      longitude: number;
      accuracy: number;
      altitude: number;
      altitudeAccuracy: number;
      date: string;
    };
    aNumber: string;
    status: number;
    devices: [string];
    accounts: [
      {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        uniqueId: string;
        name: string;
        debtorNumber: string;
        resellerReference: string;
        customerType: string;
        website: string;
        phoneNumber: string;
        kvkcocNumber: string;
        description: string;
        workingHoursType: string;
        accountNumber: string;
        accountType: {
          id: number;
          name: string;
        };
        accountIndustry: {
          id: number;
          name: string;
        };
        boboid: string;
        notes: string;
        accountOwner: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          preferredLanguage: string;
          dallasKey: string;
          homeAddress: string;
          uniqueId: string;
          objectsCount: [
            {
              name: string;
              total: number;
            }
          ];
        };
        multiViewerId: string;
        afasDebitNumber: string;
        billingAddress: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          street: string;
          houseNumber: string;
          extension: string;
          city: string;
          state: string;
          postalCode: string;
          phoneNumber: string;
          email: string;
          country: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            name: string;
          };
        };
        bankAccount: string;
        vatNumber: string;
        vatShifted: string;
        paymentTermInDays: number;
        paymentMethod: string;
        visitingAddress: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          street: string;
          houseNumber: string;
          extension: string;
          city: string;
          state: string;
          postalCode: string;
          phoneNumber: string;
          email: string;
          country: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            name: string;
          };
        };
        shippingAddress: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          street: string;
          houseNumber: string;
          extension: string;
          city: string;
          state: string;
          postalCode: string;
          phoneNumber: string;
          email: string;
          country: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            name: string;
          };
        };
        status: string;
        alarmsConfiguration: {
          additionalProp1: boolean;
          additionalProp2: boolean;
          additionalProp3: boolean;
        };
        usersCount: number;
        objectsCount: number;
        linkedObjects: [
          {
            name: string;
            total: number;
          }
        ];
        countries: [
          {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            name: string;
          }
        ];
        workingHours: [
          {
            dayOfWeek: number;
            startTime: {
              ticks: number;
              days: number;
              hours: number;
              milliseconds: number;
              microseconds: number;
              nanoseconds: number;
              minutes: number;
              seconds: number;
              totalDays: number;
              totalHours: number;
              totalMilliseconds: number;
              totalMicroseconds: number;
              totalNanoseconds: number;
              totalMinutes: number;
              totalSeconds: number;
            };
            endTime: {
              ticks: number;
              days: number;
              hours: number;
              milliseconds: number;
              microseconds: number;
              nanoseconds: number;
              minutes: number;
              seconds: number;
              totalDays: number;
              totalHours: number;
              totalMilliseconds: number;
              totalMicroseconds: number;
              totalNanoseconds: number;
              totalMinutes: number;
              totalSeconds: number;
            };
          }
        ];
      }
    ];
    users: [
      {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        preferredLanguage: string;
        dallasKey: string;
        homeAddress: string;
        uniqueId: string;
        objectsCount: [
          {
            name: string;
            total: number;
          }
        ];
      }
    ];
    owner: {
      createdBy: string;
      created: string;
      updatedBy: string;
      lastUpdated: string;
      deletedBy: string;
      deleted: string;
      isDeleted: boolean;
      uniqueId: string;
      name: string;
      debtorNumber: string;
      resellerReference: string;
      customerType: string;
      website: string;
      phoneNumber: string;
      kvkcocNumber: string;
      description: string;
      workingHoursType: string;
      accountNumber: string;
      accountType: {
        id: number;
        name: string;
      };
      accountIndustry: {
        id: number;
        name: string;
      };
      boboid: string;
      notes: string;
      accountOwner: {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        preferredLanguage: string;
        dallasKey: string;
        homeAddress: string;
        uniqueId: string;
        objectsCount: [
          {
            name: string;
            total: number;
          }
        ];
      };
      multiViewerId: string;
      afasDebitNumber: string;
      billingAddress: {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        id: number;
        street: string;
        houseNumber: string;
        extension: string;
        city: string;
        state: string;
        postalCode: string;
        phoneNumber: string;
        email: string;
        country: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          name: string;
        };
      };
      bankAccount: string;
      vatNumber: string;
      vatShifted: string;
      paymentTermInDays: number;
      paymentMethod: string;
      visitingAddress: {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        id: number;
        street: string;
        houseNumber: string;
        extension: string;
        city: string;
        state: string;
        postalCode: string;
        phoneNumber: string;
        email: string;
        country: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          name: string;
        };
      };
      shippingAddress: {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        id: number;
        street: string;
        houseNumber: string;
        extension: string;
        city: string;
        state: string;
        postalCode: string;
        phoneNumber: string;
        email: string;
        country: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          name: string;
        };
      };
      status: string;
      alarmsConfiguration: {
        additionalProp1: boolean;
        additionalProp2: boolean;
        additionalProp3: boolean;
      };
      usersCount: number;
      objectsCount: number;
      linkedObjects: [
        {
          name: string;
          total: number;
        }
      ];
      countries: [
        {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          name: string;
        }
      ];
      workingHours: [
        {
          dayOfWeek: number;
          startTime: {
            ticks: number;
            days: number;
            hours: number;
            milliseconds: number;
            microseconds: number;
            nanoseconds: number;
            minutes: number;
            seconds: number;
            totalDays: number;
            totalHours: number;
            totalMilliseconds: number;
            totalMicroseconds: number;
            totalNanoseconds: number;
            totalMinutes: number;
            totalSeconds: number;
          };
          endTime: {
            ticks: number;
            days: number;
            hours: number;
            milliseconds: number;
            microseconds: number;
            nanoseconds: number;
            minutes: number;
            seconds: number;
            totalDays: number;
            totalHours: number;
            totalMilliseconds: number;
            totalMicroseconds: number;
            totalNanoseconds: number;
            totalMinutes: number;
            totalSeconds: number;
          };
        }
      ];
    };
    objectType: {
      createdBy: string;
      created: string;
      updatedBy: string;
      lastUpdated: string;
      deletedBy: string;
      deleted: string;
      isDeleted: boolean;
      name: string;
      parentObjectType: string;
      icon: {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        id: number;
        fileName: string;
        url: string;
        uniqueId: string;
      };
      fields: [
        {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          label: string;
          isRequired: boolean;
          fieldType: number;
          maxLength: number;
          onlyNumbers: boolean;
          uniqueId: string;
        }
      ];
      fieldsCount: number;
      deviceTypes: [
        {
          deviceType: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            uniqueId: string;
            name: string;
            deviceManufacturerId: string;
            deviceManufacturer: {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              uniqueId: string;
              manufacturerName: string;
            };
            connectivity: number;
            supportsCAN: boolean;
            imageURL: string;
            deviceManufacturerName: string;
            deviceProfiles: [
              {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                uniqueId: string;
                profileName: string;
                description: string;
                deviceTypeId: string;
                configurations: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    configurationName: string;
                    profileConfigurationType: number;
                  }
                ];
              }
            ];
            deviceTypePictures: [
              {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                id: number;
                fileName: string;
                url: string;
                uniqueId: string;
              }
            ];
            deviceModules: [
              {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                uniqueId: string;
                moduleName: string;
                isRequired: boolean;
              }
            ];
            fields: [
              {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                id: number;
                label: string;
                isRequired: boolean;
                fieldType: number;
                maxLength: number;
                onlyNumbers: boolean;
                uniqueId: string;
              }
            ];
            fieldsCount: number;
          };
          defaultProfile: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            uniqueId: string;
            profileName: string;
            description: string;
            deviceTypeId: string;
            configurations: [
              {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                uniqueId: string;
                configurationName: string;
                profileConfigurationType: number;
              }
            ];
          };
          canFileName: string;
          canFilePath: string;
          canFileContentType: string;
        }
      ];
      deviceTypesCount: number;
      services: [
        {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          name: string;
          description: string;
          fields: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              label: string;
              isRequired: boolean;
              fieldType: number;
              maxLength: number;
              onlyNumbers: boolean;
              uniqueId: string;
            }
          ];
          serviceDeviceTypes: [
            {
              deviceType: {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                uniqueId: string;
                name: string;
                deviceManufacturerId: string;
                deviceManufacturer: {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  manufacturerName: string;
                };
                connectivity: number;
                supportsCAN: boolean;
                imageURL: string;
                deviceManufacturerName: string;
                deviceProfiles: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    profileName: string;
                    description: string;
                    deviceTypeId: string;
                    configurations: [
                      {
                        createdBy: string;
                        created: string;
                        updatedBy: string;
                        lastUpdated: string;
                        deletedBy: string;
                        deleted: string;
                        isDeleted: boolean;
                        uniqueId: string;
                        configurationName: string;
                        profileConfigurationType: number;
                      }
                    ];
                  }
                ];
                deviceTypePictures: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    id: number;
                    fileName: string;
                    url: string;
                    uniqueId: string;
                  }
                ];
                deviceModules: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    moduleName: string;
                    isRequired: boolean;
                  }
                ];
                fields: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    id: number;
                    label: string;
                    isRequired: boolean;
                    fieldType: number;
                    maxLength: number;
                    onlyNumbers: boolean;
                    uniqueId: string;
                  }
                ];
                fieldsCount: number;
              };
              requiredModules: [
                {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  moduleName: string;
                  isRequired: boolean;
                }
              ];
              optionalModules: [
                {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  moduleName: string;
                  isRequired: boolean;
                }
              ];
            }
          ];
          objectTypesCount: number;
          fieldsCount: number;
          uniqueId: string;
        }
      ];
      servicesCount: number;
      objectsCount: number;
      uniqueId: string;
    };
    multiviewerName: string;
    mileage: number;
    comments: string;
    alarmsConfiguration: {
      additionalProp1: boolean;
      additionalProp2: boolean;
      additionalProp3: boolean;
    };
    notifications: {
      additionalProp1: boolean;
      additionalProp2: boolean;
      additionalProp3: boolean;
    };
    remindersFrom: number;
    remindersForEvery: number;
    reminderEmail: string;
    reminderName: string;
    installations: [
      {
        createdBy: string;
        created: string;
        updatedBy: string;
        lastUpdated: string;
        deletedBy: string;
        deleted: string;
        isDeleted: boolean;
        name: string;
        uniqueId: string;
        userId: string;
        currentStep: string;
        account: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          uniqueId: string;
          name: string;
          debtorNumber: string;
          resellerReference: string;
          customerType: string;
          website: string;
          phoneNumber: string;
          kvkcocNumber: string;
          description: string;
          workingHoursType: string;
          accountNumber: string;
          accountType: {
            id: number;
            name: string;
          };
          accountIndustry: {
            id: number;
            name: string;
          };
          boboid: string;
          notes: string;
          accountOwner: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            preferredLanguage: string;
            dallasKey: string;
            homeAddress: string;
            uniqueId: string;
            objectsCount: [
              {
                name: string;
                total: number;
              }
            ];
          };
          multiViewerId: string;
          afasDebitNumber: string;
          billingAddress: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            street: string;
            houseNumber: string;
            extension: string;
            city: string;
            state: string;
            postalCode: string;
            phoneNumber: string;
            email: string;
            country: {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              name: string;
            };
          };
          bankAccount: string;
          vatNumber: string;
          vatShifted: string;
          paymentTermInDays: number;
          paymentMethod: string;
          visitingAddress: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            street: string;
            houseNumber: string;
            extension: string;
            city: string;
            state: string;
            postalCode: string;
            phoneNumber: string;
            email: string;
            country: {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              name: string;
            };
          };
          shippingAddress: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            street: string;
            houseNumber: string;
            extension: string;
            city: string;
            state: string;
            postalCode: string;
            phoneNumber: string;
            email: string;
            country: {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              name: string;
            };
          };
          status: string;
          alarmsConfiguration: {
            additionalProp1: boolean;
            additionalProp2: boolean;
            additionalProp3: boolean;
          };
          usersCount: number;
          objectsCount: number;
          linkedObjects: [
            {
              name: string;
              total: number;
            }
          ];
          countries: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              name: string;
            }
          ];
          workingHours: [
            {
              dayOfWeek: number;
              startTime: {
                ticks: number;
                days: number;
                hours: number;
                milliseconds: number;
                microseconds: number;
                nanoseconds: number;
                minutes: number;
                seconds: number;
                totalDays: number;
                totalHours: number;
                totalMilliseconds: number;
                totalMicroseconds: number;
                totalNanoseconds: number;
                totalMinutes: number;
                totalSeconds: number;
              };
              endTime: {
                ticks: number;
                days: number;
                hours: number;
                milliseconds: number;
                microseconds: number;
                nanoseconds: number;
                minutes: number;
                seconds: number;
                totalDays: number;
                totalHours: number;
                totalMilliseconds: number;
                totalMicroseconds: number;
                totalNanoseconds: number;
                totalMinutes: number;
                totalSeconds: number;
              };
            }
          ];
        };
        deviceType: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          uniqueId: string;
          name: string;
          deviceManufacturerId: string;
          deviceManufacturer: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            uniqueId: string;
            manufacturerName: string;
          };
          connectivity: number;
          supportsCAN: boolean;
          imageURL: string;
          deviceManufacturerName: string;
          deviceProfiles: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              uniqueId: string;
              profileName: string;
              description: string;
              deviceTypeId: string;
              configurations: [
                {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  configurationName: string;
                  profileConfigurationType: number;
                }
              ];
            }
          ];
          deviceTypePictures: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              fileName: string;
              url: string;
              uniqueId: string;
            }
          ];
          deviceModules: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              uniqueId: string;
              moduleName: string;
              isRequired: boolean;
            }
          ];
          fields: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              label: string;
              isRequired: boolean;
              fieldType: number;
              maxLength: number;
              onlyNumbers: boolean;
              uniqueId: string;
            }
          ];
          fieldsCount: number;
        };
        device: string;
        objectType: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          name: string;
          parentObjectType: string;
          icon: {
            createdBy: string;
            created: string;
            updatedBy: string;
            lastUpdated: string;
            deletedBy: string;
            deleted: string;
            isDeleted: boolean;
            id: number;
            fileName: string;
            url: string;
            uniqueId: string;
          };
          fields: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              label: string;
              isRequired: boolean;
              fieldType: number;
              maxLength: number;
              onlyNumbers: boolean;
              uniqueId: string;
            }
          ];
          fieldsCount: number;
          deviceTypes: [
            {
              deviceType: {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                uniqueId: string;
                name: string;
                deviceManufacturerId: string;
                deviceManufacturer: {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  manufacturerName: string;
                };
                connectivity: number;
                supportsCAN: boolean;
                imageURL: string;
                deviceManufacturerName: string;
                deviceProfiles: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    profileName: string;
                    description: string;
                    deviceTypeId: string;
                    configurations: [
                      {
                        createdBy: string;
                        created: string;
                        updatedBy: string;
                        lastUpdated: string;
                        deletedBy: string;
                        deleted: string;
                        isDeleted: boolean;
                        uniqueId: string;
                        configurationName: string;
                        profileConfigurationType: number;
                      }
                    ];
                  }
                ];
                deviceTypePictures: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    id: number;
                    fileName: string;
                    url: string;
                    uniqueId: string;
                  }
                ];
                deviceModules: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    moduleName: string;
                    isRequired: boolean;
                  }
                ];
                fields: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    id: number;
                    label: string;
                    isRequired: boolean;
                    fieldType: number;
                    maxLength: number;
                    onlyNumbers: boolean;
                    uniqueId: string;
                  }
                ];
                fieldsCount: number;
              };
              defaultProfile: {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                uniqueId: string;
                profileName: string;
                description: string;
                deviceTypeId: string;
                configurations: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    configurationName: string;
                    profileConfigurationType: number;
                  }
                ];
              };
              canFileName: string;
              canFilePath: string;
              canFileContentType: string;
            }
          ];
          deviceTypesCount: number;
          services: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              name: string;
              description: string;
              fields: [
                {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  id: number;
                  label: string;
                  isRequired: boolean;
                  fieldType: number;
                  maxLength: number;
                  onlyNumbers: boolean;
                  uniqueId: string;
                }
              ];
              serviceDeviceTypes: [
                {
                  deviceType: {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    name: string;
                    deviceManufacturerId: string;
                    deviceManufacturer: {
                      createdBy: string;
                      created: string;
                      updatedBy: string;
                      lastUpdated: string;
                      deletedBy: string;
                      deleted: string;
                      isDeleted: boolean;
                      uniqueId: string;
                      manufacturerName: string;
                    };
                    connectivity: number;
                    supportsCAN: boolean;
                    imageURL: string;
                    deviceManufacturerName: string;
                    deviceProfiles: [
                      {
                        createdBy: string;
                        created: string;
                        updatedBy: string;
                        lastUpdated: string;
                        deletedBy: string;
                        deleted: string;
                        isDeleted: boolean;
                        uniqueId: string;
                        profileName: string;
                        description: string;
                        deviceTypeId: string;
                        configurations: [
                          {
                            createdBy: string;
                            created: string;
                            updatedBy: string;
                            lastUpdated: string;
                            deletedBy: string;
                            deleted: string;
                            isDeleted: boolean;
                            uniqueId: string;
                            configurationName: string;
                            profileConfigurationType: number;
                          }
                        ];
                      }
                    ];
                    deviceTypePictures: [
                      {
                        createdBy: string;
                        created: string;
                        updatedBy: string;
                        lastUpdated: string;
                        deletedBy: string;
                        deleted: string;
                        isDeleted: boolean;
                        id: number;
                        fileName: string;
                        url: string;
                        uniqueId: string;
                      }
                    ];
                    deviceModules: [
                      {
                        createdBy: string;
                        created: string;
                        updatedBy: string;
                        lastUpdated: string;
                        deletedBy: string;
                        deleted: string;
                        isDeleted: boolean;
                        uniqueId: string;
                        moduleName: string;
                        isRequired: boolean;
                      }
                    ];
                    fields: [
                      {
                        createdBy: string;
                        created: string;
                        updatedBy: string;
                        lastUpdated: string;
                        deletedBy: string;
                        deleted: string;
                        isDeleted: boolean;
                        id: number;
                        label: string;
                        isRequired: boolean;
                        fieldType: number;
                        maxLength: number;
                        onlyNumbers: boolean;
                        uniqueId: string;
                      }
                    ];
                    fieldsCount: number;
                  };
                  requiredModules: [
                    {
                      createdBy: string;
                      created: string;
                      updatedBy: string;
                      lastUpdated: string;
                      deletedBy: string;
                      deleted: string;
                      isDeleted: boolean;
                      uniqueId: string;
                      moduleName: string;
                      isRequired: boolean;
                    }
                  ];
                  optionalModules: [
                    {
                      createdBy: string;
                      created: string;
                      updatedBy: string;
                      lastUpdated: string;
                      deletedBy: string;
                      deleted: string;
                      isDeleted: boolean;
                      uniqueId: string;
                      moduleName: string;
                      isRequired: boolean;
                    }
                  ];
                }
              ];
              objectTypesCount: number;
              fieldsCount: number;
              uniqueId: string;
            }
          ];
          servicesCount: number;
          objectsCount: number;
          uniqueId: string;
        };
        object: string;
        service: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          name: string;
          description: string;
          fields: [
            {
              createdBy: string;
              created: string;
              updatedBy: string;
              lastUpdated: string;
              deletedBy: string;
              deleted: string;
              isDeleted: boolean;
              id: number;
              label: string;
              isRequired: boolean;
              fieldType: number;
              maxLength: number;
              onlyNumbers: boolean;
              uniqueId: string;
            }
          ];
          serviceDeviceTypes: [
            {
              deviceType: {
                createdBy: string;
                created: string;
                updatedBy: string;
                lastUpdated: string;
                deletedBy: string;
                deleted: string;
                isDeleted: boolean;
                uniqueId: string;
                name: string;
                deviceManufacturerId: string;
                deviceManufacturer: {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  manufacturerName: string;
                };
                connectivity: number;
                supportsCAN: boolean;
                imageURL: string;
                deviceManufacturerName: string;
                deviceProfiles: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    profileName: string;
                    description: string;
                    deviceTypeId: string;
                    configurations: [
                      {
                        createdBy: string;
                        created: string;
                        updatedBy: string;
                        lastUpdated: string;
                        deletedBy: string;
                        deleted: string;
                        isDeleted: boolean;
                        uniqueId: string;
                        configurationName: string;
                        profileConfigurationType: number;
                      }
                    ];
                  }
                ];
                deviceTypePictures: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    id: number;
                    fileName: string;
                    url: string;
                    uniqueId: string;
                  }
                ];
                deviceModules: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    uniqueId: string;
                    moduleName: string;
                    isRequired: boolean;
                  }
                ];
                fields: [
                  {
                    createdBy: string;
                    created: string;
                    updatedBy: string;
                    lastUpdated: string;
                    deletedBy: string;
                    deleted: string;
                    isDeleted: boolean;
                    id: number;
                    label: string;
                    isRequired: boolean;
                    fieldType: number;
                    maxLength: number;
                    onlyNumbers: boolean;
                    uniqueId: string;
                  }
                ];
                fieldsCount: number;
              };
              requiredModules: [
                {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  moduleName: string;
                  isRequired: boolean;
                }
              ];
              optionalModules: [
                {
                  createdBy: string;
                  created: string;
                  updatedBy: string;
                  lastUpdated: string;
                  deletedBy: string;
                  deleted: string;
                  isDeleted: boolean;
                  uniqueId: string;
                  moduleName: string;
                  isRequired: boolean;
                }
              ];
            }
          ];
          objectTypesCount: number;
          fieldsCount: number;
          uniqueId: string;
        };
        comments: string;
        status: number;
        installationInformation: [
          {
            installationUniqueId: string;
            fieldUniqueId: string;
            fieldLabel: string;
            value: string;
            informationType: number;
          }
        ];
      }
    ];
    metadata: [
      {
        reportedOn: string;
        reportedBy: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          preferredLanguage: string;
          dallasKey: string;
          homeAddress: string;
          uniqueId: string;
          objectsCount: [
            {
              name: string;
              total: number;
            }
          ];
        };
        field: {
          createdBy: string;
          created: string;
          updatedBy: string;
          lastUpdated: string;
          deletedBy: string;
          deleted: string;
          isDeleted: boolean;
          id: number;
          label: string;
          isRequired: boolean;
          fieldType: number;
          maxLength: number;
          onlyNumbers: boolean;
          uniqueId: string;
        };
        value: string;
        informationType: string;
      }
    ];
    isWorkingHoursOverriden: boolean;
    workingHoursType: number;
    workingHours: [
      {
        dayOfWeek: number;
        startTime: {
          ticks: number;
          days: number;
          hours: number;
          milliseconds: number;
          microseconds: number;
          nanoseconds: number;
          minutes: number;
          seconds: number;
          totalDays: number;
          totalHours: number;
          totalMilliseconds: number;
          totalMicroseconds: number;
          totalNanoseconds: number;
          totalMinutes: number;
          totalSeconds: number;
        };
        endTime: {
          ticks: number;
          days: number;
          hours: number;
          milliseconds: number;
          microseconds: number;
          nanoseconds: number;
          minutes: number;
          seconds: number;
          totalDays: number;
          totalHours: number;
          totalMilliseconds: number;
          totalMicroseconds: number;
          totalNanoseconds: number;
          totalMinutes: number;
          totalSeconds: number;
        };
      }
    ];
  };
  deviceModules: [
    {
      createdBy: string;
      created: string;
      updatedBy: string;
      lastUpdated: string;
      deletedBy: string;
      deleted: string;
      isDeleted: boolean;
      uniqueId: string;
      moduleName: string;
      isRequired: boolean;
    }
  ];
  lastReceivedNetwork: string;
  isOnLine: boolean;
  lastBatteryValue: string;
  status: string;
  activationCode: string;
}
