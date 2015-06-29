using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;

using static H1Z1Bot.WinAPI.User32;

namespace H1Z1Bot.IO
{
    public class HotkeyHandler
    {
        public delegate void HotkeyAction(VirtualKey key, ModifierKeys modkey);

        public readonly VirtualKey Key;
        public readonly ModifierKeys ModKey;
        public readonly HotkeyAction Action;

        public HotkeyHandler(VirtualKey key, HotkeyAction action) : this(key, ModifierKeys.None, action) { }

        public HotkeyHandler(VirtualKey key, ModifierKeys modkey, HotkeyAction action)
        {
            this.Key = key;
            this.ModKey = modkey;
            this.Action = action;
        }
    }
}