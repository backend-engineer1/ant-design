# 实践案例

- category: 0
- order: 0

---

Ant Design 是面向中后台的 UI 设计语言。

从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 40 个以上。定位于中后台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。

## 最佳实践

---

### 金融云

<img as-cover class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/UkUJgmsRKhxwvSR.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/SeXqPPyixccDJBY.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/IRjHVNFWRlCMdnb.png">

金融云是面向金融机构深度定制的行业云计算服务；助力金融机构向新金融转型升级，推动平台、数据和技术方面的能力全面对外开放。

<a class="outside-link" href="https://www.cloud.alipay.com/" target="_blank">立即访问</a>

---

### OceanBase Cloud Platform

<img as-cover class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/StdoWgtFplToSgd.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/lpzTKvgLpJgKGpq.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/GVJGaWbqfBFedWN.png">

OceanBase 是一款真正意义上的云端分布式关系型数据库，而 OceanBase Cloud Platform（云平台）是以 OceanBase 数据库为基础的云服务，可以帮助用户快速创建、使用 OB 服务。

<a class="outside-link internal" href="http://oceanbase.alipay.com/" target="_blank">立即访问</a>

---

### 服务宝体验平台

<img as-cover class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/khisYONMFbBTOdh.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/vsoYArBwcPRZnVE.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/TMyfsUGQSjOdGIm.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/sBlmIcJXZdJTJbC.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/fRDuTjVbVApxyzU.png">

体验平台是收集用户与公司所有的接触点（包括来电咨询／微博等渠道）的数据，通过数据挖掘和体验同学运营的方式推送给公司内部的业务团队／产品经理，并推动体验问题解决，从而实现良性运转流。

<a class="outside-link internal" href="http://tiyan.alipay.com/" target="_blank">立即访问</a>

---

### AntV

<img as-cover class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/yWNVSFBhKsoShvi.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/nvJftlNzfzhVDVW.png">
<img class="preview-img" width="420" align="right" src="https://os.alipayobjects.com/rmsportal/LugOCvzybKsmQCj.png">

AntV 将数据图形小组近几年在探索数据可视化过程中取得的成果进行总结和沉淀，并分享给所有需要数据可视理论的人。

<a class="outside-link internal" href="http://antv.alipay.net/" target="_blank">立即访问</a>

<style>
.preview-image-boxes {
  margin-top: -36px;
}
.preview-image-wrapper {
  padding: 0;
  background: #fff;
}
.toc {
  display: none;
}
.outside-link.internal {
  display: none;
}
</style>

<script>
(function() {
  var links = Array.apply(null, document.querySelectorAll('.outside-link.internal'));
  var checkImgUrl = 'http://alipay-rmsdeploy-dev-image.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/JdVaTbZzPxEldUi.png';
  ping(checkImgUrl, function(status) {
    if (status === 'responded') {
      links.forEach(function(link) {
        link.style.display = 'block';
      });
    }
  });

  function ping(url, callback) {
    var img = new Image();
    var done;
    var finish = function(status) {
      if (!done) {
        done = true;
        img.src = '';
        callback(status);
      }
    }
    img.onload = function() {
      finish('responded');
    };
    img.onerror = function(e) {
      finish('error');
    };
    img.src = url;
    setTimeout(function() {
      finish('timeout');
    }, 1500);
  }
})();
</script>
