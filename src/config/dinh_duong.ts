export const menu_dinh_duong = (currentAge: number) => ([
  {
    condition: 1 <= currentAge && currentAge < 3,
    dinh_duong: {
      'thua_can': {
        bua_sang: [
          {
            menu: 'Cháo thịt gà nấu rau củ (cà rốt, khoai tây, 30g thịt gà',
            nang_luong: '120 kcal'
          },
          {
            menu: '1/2 quả chuối nghiền',
            nang_luong: '45 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cháo yến mạch nấu tôm (50g yến mạch, 20g tôm, rau cải bó xôi xay nhuyễn)',
            nang_luong: '130 kcal'
          },
          {
            menu: 'Thịt gà nướng (40g)',
            nang_luong: '100 kcal'
          },
          {
            menu: 'Rau muống luộc (50g)',
            nang_luong: '15 kcal'
          },
          {
            menu: 'Canh cải xanh nấu thịt bằm (40g thịt)',
            nang_luong: '80 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả táo nhỏ',
            nang_luong: '52 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Súp rau củ với thịt gà nạc (cà rốt, khoai tây, 40g thịt gà)',
            nang_luong: '140 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      },
      'thieu_can': {
        bua_sang: [
          {
            menu: 'Bánh mì kẹp thịt nguội và phô mai (2 lát bánh mì, 30g thịt nguội, 10g phô mai) ',
            nang_luong: '220 kcal'
          },
          {
            menu: '1 quả chuối ',
            nang_luong: '90 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (1 bát) (1 bát)',
            nang_luong: '150 kcal'
          },
          {
            menu: 'Cá kho tộ (50g cá)',
            nang_luong: '200 kcal'
          },
          {
            menu: 'Rau cải xào tỏi (50g rau)',
            nang_luong: '70 kcal'
          },
          {
            menu: 'Canh bí đỏ nấu tôm (50g bí, 20g tôm) ',
            nang_luong: '60 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 hộp sữa chua uống ',
            nang_luong: '100 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cơm nát với cá hồi áp chảo (50g cơm, 30g cá hồi) ',
            nang_luong: '250 kcal'
          },
          {
            menu: 'rau cải xanh xào tỏi (30g)',
            nang_luong: '70 kcal'
          }
        ]
      },
      'can_nang_chuan': {
        bua_sang: [
          {
            menu: 'Phở bò (50g bánh phở, 30g thịt bò, hành lá) ',
            nang_luong: '200 kcal'
          },
          {
            menu: '1/2 quả táo ',
            nang_luong: '26 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (1 bát)',
            nang_luong: '150 kcal'
          },
          {
            menu: 'Gà xào nấm (50g gà, 30g nấm)',
            nang_luong: '100 kcal'
          },
          {
            menu: 'Canh rau ngót nấu thịt (30g rau, 20g thịt)',
            nang_luong: '60 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả lê nhỏ',
            nang_luong: '50 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cháo thịt gà với rau củ (50g gạo, 30g thịt gà, rau củ)',
            nang_luong: '150 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      }
    }
  },
  {
    condition: 3 <= currentAge && currentAge < 6,
    dinh_duong: {
      'thua_can': {
        bua_sang: [
          {
            menu: 'Phở gà (50g bánh phở, 30g thịt gà, rau thơm)',
            nang_luong: '150 kcal'
          },
          {
            menu: '1/2 quả chuối',
            nang_luong: '45 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm gạo lứt (1/2 bát)',
            nang_luong: '80 kcal'
          },
          {
            menu: 'Cá hấp gừng (30g cá rô phi)',
            nang_luong: '40 kcal'
          },
          {
            menu: 'Rau muống luộc (50g)',
            nang_luong: '15 kcal'
          },
          {
            menu: 'Canh cải xanh nấu thịt bằm (40g thịt)',
            nang_luong: '60 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả táo nhỏ',
            nang_luong: '52 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cháo đậu xanh (50g gạo, 30g đậu xanh, thịt băm',
            nang_luong: '110 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      },
      'thieu_can': {
        bua_sang: [
          {
            menu: 'Bánh mì kẹp thịt nướng, dưa leo, rau thơm',
            nang_luong: '200 kcal'
          },
          {
            menu: '1 quả chuối ',
            nang_luong: '90 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (1 bát)',
            nang_luong: '150 kcal'
          },
          {
            menu: 'Thịt kho trứng cút (30g thịt, 1 trứng cút)',
            nang_luong: '180 kcal'
          },
          {
            menu: 'Rau cải thìa xào tỏi (30g cải, 5g dầu ăn)',
            nang_luong: '70 kcal'
          },
          {
            menu: 'Canh chua cá',
            nang_luong: '80 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 hũ sữa chua nguyên chất',
            nang_luong: '100 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cháo gà với bí đỏ (50g gạo, 30g bí đỏ, thịt gà xé nhỏ)',
            nang_luong: '150 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      },
      'can_nang_chuan': {
        bua_sang: [
          {
            menu: 'Cháo thịt bằm rau củ (50g gạo, 20g thịt bằm)',
            nang_luong: '150 kcal'
          },
          {
            menu: '1 quả táo nhỏ',
            nang_luong: '52 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (3/4 bát)',
            nang_luong: '110 kcal'
          },
          {
            menu: 'Thịt gà hấp lá chanh (30g thịt gà)',
            nang_luong: '70 kcal'
          },
          {
            menu: 'Canh bí xanh nấu tôm (50g bí, 20g tôm)',
            nang_luong: '60 kcal'
          },
          {
            menu: 'Rau cải luộc (30g)',
            nang_luong: '15 kcal'
          }
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả lê nhỏ',
            nang_luong: '50 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Súp rau củ (khoai tây, cà rốt, đậu hà lan, 10g thịt nạc băm nhỏ)',
            nang_luong: '130 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      }
    }
  },
  {
    condition: 6 <= currentAge && currentAge < 12,
    dinh_duong: {
      'thua_can': {
        bua_sang: [
          {
            menu: '1 bát nhỏ cháo yến mạch với sữa (40g yến mạch, 100ml sữa)',
            nang_luong: '130 kcal'
          },
          {
            menu: '1/2 quả táo',
            nang_luong: '26 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm gạo lứt (1/2 bát)',
            nang_luong: '60 kcal'
          },
          {
            menu: 'Cá hấp (30g)',
            nang_luong: '60 kcal'
          },
          {
            menu: 'Rau muống luộc (50g)',
            nang_luong: '15 kcal'
          },
          {
            menu: 'Canh cải xanh nấu thịt bằm (30g thịt)',
            nang_luong: '70 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả lê nhỏ',
            nang_luong: '50 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Súp rau củ với thịt gà nạc (cà rốt, khoai tây, 30g thịt gà)',
            nang_luong: '100 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      },
      'thieu_can': {
        bua_sang: [
          {
            menu: 'Bánh mì kẹp thịt nguội và phô mai (2 lát bánh mì, 40g thịt nguội, 15g phô mai)',
            nang_luong: '300 kcal'
          },
          {
            menu: '1 quả chuối ',
            nang_luong: '90 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (1.5 bát)',
            nang_luong: '225 kcal'
          },
          {
            menu: 'Thịt bò kho gừng (80g thịt bò)',
            nang_luong: '320 kcal'
          },
          {
            menu: 'Rau cải xào tỏi (70g rau)',
            nang_luong: '100 kcal'
          },
          {
            menu: 'Canh bí đỏ nấu tôm (50g bí, 30g tôm) ',
            nang_luong: '80 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 hũ sữa chua nguyên chất',
            nang_luong: '120 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cơm nát với cá hồi áp chảo (70g cơm, 50g cá hồi) ',
            nang_luong: '350 kcal'
          },
          {
            menu: 'Rau cải xanh xào tỏi (50g)',
            nang_luong: '100 kcal'
          }
        ]
      },
      'can_nang_chuan': {
        bua_sang: [
          {
            menu: 'Phở gà (70g bánh phở, 50g thịt gà, rau thơm)',
            nang_luong: '300 kcal'
          },
          {
            menu: '1 quả cam',
            nang_luong: '60 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (1 bát)',
            nang_luong: '150 kcal'
          },
          {
            menu: 'Gà xào nấm (70g gà, 30g nấm)',
            nang_luong: '150 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả táo lớn',
            nang_luong: '80 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cháo thịt gà với rau củ (70g gạo, 50g thịt gà, rau củ)',
            nang_luong: '250 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      }
    }
  },
  {
    condition: 12 <= currentAge && currentAge < 18,
    dinh_duong: {
      'thua_can': {
        bua_sang: [
          {
            menu: '1 lát bánh mì nguyên cám với trứng luộc (1 quả)',
            nang_luong: '170 kcal'
          },
          {
            menu: '1/2 quả táo',
            nang_luong: '26 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm gạo lứt (1 bát)',
            nang_luong: '120 kcal'
          },
          {
            menu: 'Cá hấp (50g)',
            nang_luong: '100 kcal'
          },
          {
            menu: 'Rau muống luộc (50g)',
            nang_luong: '15 kcal'
          },
          {
            menu: 'Canh cải xanh nấu thịt bằm (40g thịt)',
            nang_luong: '80 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả lê nhỏ',
            nang_luong: '50 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Súp rau củ với thịt gà nạc (cà rốt, khoai tây, 50g thịt gà)',
            nang_luong: '150 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      },
      'thieu_can': {
        bua_sang: [
          {
            menu: 'Bánh mì kẹp trứng và phô mai (2 lát bánh mì, 2 quả trứng, 20g phô mai)',
            nang_luong: '350 kcal'
          },
          {
            menu: '1 quả chuối ',
            nang_luong: '90 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (1.5 bát)',
            nang_luong: '225 kcal'
          },
          {
            menu: 'Thịt bò kho tiêu (100g thịt bò)',
            nang_luong: '350 kcal'
          },
          {
            menu: 'Rau xào thập cẩm (80g rau)',
            nang_luong: '100 kcal'
          },
          {
            menu: 'Canh bí đỏ nấu tôm (70g bí, 50g tôm) ',
            nang_luong: '100 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 hũ sữa chua nguyên chất',
            nang_luong: '120 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cơm với cá hồi áp chảo (80g cơm, 70g cá hồi)',
            nang_luong: '450 kcal'
          },
          {
            menu: 'Rau cải xanh xào tỏi (80g)',
            nang_luong: '100 kcal'
          }
        ]
      },
      'can_nang_chuan': {
        bua_sang: [
          {
            menu: 'Phở bò (80g bánh phở, 70g thịt bò, rau thơm)',
            nang_luong: '350 kcal'
          },
          {
            menu: '1 quả cam',
            nang_luong: '60 kcal'
          }
        ],
        bua_phu_sang: [
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_trua: [
          {
            menu: 'Cơm trắng (1 bát)',
            nang_luong: '150 kcal'
          },
          {
            menu: 'Thịt gà xào nấm (80g gà, 50g nấm)',
            nang_luong: '200 kcal'
          },
          {
            menu: 'Canh rau ngót nấu thịt (50g rau, 30g thịt)',
            nang_luong: '80 kcal'
          },
        ],
        bua_phu_chieu: [
          {
            menu: '1 quả táo lớn',
            nang_luong: '80 kcal'
          },
          {
            menu: '1 ly sữa OZ',
            nang_luong: '184 kcal'
          }
        ],
        bua_toi: [
          {
            menu: 'Cháo thịt gà với rau củ (70g gạo, 70g thịt gà, rau củ)',
            nang_luong: '300 kcal'
          },
          {
            menu: '1 lát bánh mì nguyên cám',
            nang_luong: '60 kcal'
          }
        ]
      }
    }
  }
])