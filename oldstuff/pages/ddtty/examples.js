/**
 * @author DD~!
 */

"use strict";

function RainbowText()
{
    var OFFSET = 2;
    for (var h = 0; h <= 360; h += OFFSET)
    {
        ddd.ForegroundColor = "hsl(" + h + ", 100%, 50%)";
        ddd.Write("#");
    }
    ddd.ForegroundColor = "white";
}

function Meme()
{
    ddd.WriteLine("   ###        ###      ###");
    ddd.WriteLine("  #   ##     #   #    #   #");
    ddd.WriteLine("   ##   ##    #   #   #   #");
    ddd.WriteLine("     ##   ##   #   #   #   #         ###############        ###############");
    ddd.WriteLine("      ##    ##  #   #  #   #       ##               ##    ##               ##");
    ddd.WriteLine("        ##    ## #   #  #   #                         #                      #");
    ddd.WriteLine("          ##    # #   # #   #             ####                   ####");
    ddd.WriteLine("            #    #     #    #         ####    ####           ####    ####");
    ddd.WriteLine("      ######                 #      ########      ##       ########      ##");
    ddd.WriteLine("    ##                       #     ###########      #     ###########      #");
    ddd.WriteLine("   #    ########              #   #############      #   #############      #");
    ddd.WriteLine("  #   ##        ##             #  #############      #   #############      #");
    ddd.WriteLine(" #   #            #              ###############      # ###############      #");
    ddd.WriteLine("#   #             #              ###############      # ###############      #");
    ddd.WriteLine("#   #            #               ###############      # ###############      #");
    ddd.WriteLine(" ###          ###                 #############      #   #############      #");
    ddd.WriteLine("  ############                    #############      #   #############      #");
    ddd.WriteLine(" #                                 ###########      #     ###########      #");
    ddd.WriteLine("  #############                     ########      ##       ########      ##");
    ddd.WriteLine("               ########               ####    ####           ####    ####");
    ddd.WriteLine("                       #########          ####                   ####");
}