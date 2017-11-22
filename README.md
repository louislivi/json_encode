# json_encode
## php json_encode javascript version.
<p>PHP json_encode javascript version.this file has php json_encode function ,and has php json_encode options constents</p>
<p><code>const JSON_HEX_QUOT = 8;</code></p>
<p><code>const JSON_HEX_TAG = 1;</code></p>
<p><code>const JSON_HEX_AMP = 2;</code></p>
<p><code>const JSON_HEX_APOS = 4;</code></p>
<p><code>const JSON_NUMERIC_CHECK = 32;</code></p>
<p><code>const JSON_UNESCAPED_SLASHES = 64;</code></p>
<p><code>const JSON_UNESCAPED_UNICODE = 256;</code></p>
<p><code>const JSON_FORCE_OBJECT = 16;</code></code></p>
- Demo
<pre><code><script src="./json_encode.min.js"></script>
<script>
  var arr = new Array;
  arr['one'] = new Array;
  arr['one'][0] = 0;
  arr['one'][1] = 1;
  arr['two'] = new Array;
  arr['two']['one'] = 'one';
  arr['two']['two'] = 'two';
  arr['tree'] = 3;
  console.log(json_encode(arr);
<p><code></script></code></pre>

* Result
  <pre><code>{"one":[0,1],"two":{"one":"one","two":"two"},"tree":3}</code></pre>

