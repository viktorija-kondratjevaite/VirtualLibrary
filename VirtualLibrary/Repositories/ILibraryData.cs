﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VirtualLibrary.Repositories
{
    public interface ILibraryData
    {
        IUserRepository userRepository { get; set; }
        IBookRepository bookRepository { get; set; }
    }
}
