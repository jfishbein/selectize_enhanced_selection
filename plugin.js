/**
 * Plugin: "enhanced_selection" (selectize.js)
 * Copyright (c) 2016 Jonathan Fishbein
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Jonathan Fishbein <jfishbein@gmail.com>
 */

Selectize.define('enhanced_selection', function() {
    var self = this;

    // Replace the origibnal advance selection function with out new function that allows us to select items as we go
    this.advanceSelection = function(direction, e) {
        var tail, selection, idx, valueLength, cursorAtEdge, $tail;
        var self = this;

        if (direction === 0) return;
        if (self.rtl) direction *= -1;

        tail = direction > 0 ? 'last' : 'first';
        selection = getSelection(self.$control_input[0]);

        if (self.isFocused && !self.isInputHidden) {
            valueLength = self.$control_input.val().length;
            cursorAtEdge = direction < 0 ? selection.start === 0 && selection.length === 0 : selection.start === valueLength;

            if (cursorAtEdge && !valueLength) {

                // Select the adjacent item rather than skip over it
                idx = self.$control.children().index(self.$control_input);
                self.setActiveItem(self.$control.children()[direction > 0 ? idx + 1 : idx - 1]);
            }
        } else {
            $tail = self.$control.children('.active:' + tail);
            if ($tail.length) {
                idx = self.$control.children(':not(input)').index($tail);
                self.setActiveItem(null);
                self.setCaret(direction > 0 ? idx + 1 : idx);
            }
        }
    }

});
