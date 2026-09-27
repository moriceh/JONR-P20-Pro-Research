bj_name: obj_name
            }));

          case 4:
            res = _context2.sent;

            if (!(!res || !res.url)) {
              _context2.next = 7;
              break;
            }

            throw new Error('Failed to get file download URL:', res);

          case 7:
   