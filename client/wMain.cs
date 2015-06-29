using H1Z1Bot.IO;
using H1Z1Bot.WinAPI;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WindowsInput;

namespace H1Z1Bot
{
    public partial class wMain : Form
    {
        private static readonly int COORD_X = 1444;
        private static readonly int COORD_Y = 719;

        private InputSimulator iosim = new InputSimulator();
        private Random rand = new Random();

        public wMain()
        {
            InitializeComponent();
            this.Icon = H1Z1Bot.Properties.Resources.icon;

            this.lConnection.Text = "Desconectado";

            HotkeyManager.Add(new HotkeyHandler(User32.VirtualKey.VK_F10, User32.ModifierKeys.None, OnF10Pressed));
            HotkeyManager.Add(new HotkeyHandler(User32.VirtualKey.VK_F11, User32.ModifierKeys.None, OnF11Pressed));
        }

        private void OnF10Pressed(User32.VirtualKey key, User32.ModifierKeys modkey)
        {
            
        }

        private void OnF11Pressed(User32.VirtualKey key, User32.ModifierKeys modkey)
        {
        }

        private void SendCode(uint code)
        {

            iosim
                .Keyboard
                .KeyPress(WindowsInput.Native.VirtualKeyCode.VK_E)
                .Sleep(rand.Next(1000, 2000))
                .TextEntry(code.ToString())
                .Sleep(rand.Next(1000, 2000))
                .Mouse
                .MoveMouseTo(COORD_X, COORD_Y)
                .LeftButtonClick()
                .Sleep(rand.Next(1000, 2000));
        }
    }
}
