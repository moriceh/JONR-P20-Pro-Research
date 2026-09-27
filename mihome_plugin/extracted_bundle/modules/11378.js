.toString()) == null ? undefined : _startHour$toString.padStart(2, '0')) + ":" + (startMin == null ? undefined : (_startMin$toString = startMin.toString()) == null ? undefined : _startMin$toString.padStart(2, '0')),
        endTime: (endHour == null ? undefined : (_endHour$toString = endHour.toString()) == null ? undefined : _endHour$toString.padStart(2, '0')) + ":" + (endMin == null ? undefined : (_endMin$toString = endMin.toString()) == null ? undefined : _endMin$toString.padStart(2, '0')),
        notDust: (_notDust = notDust) != null ? _notDust : 0,
        notDry: (_notDry = notDry) != null ? _notDry : 0,
        confirmDigalogVisible: false,
        datePicker: {
          visible: false,
          title: 