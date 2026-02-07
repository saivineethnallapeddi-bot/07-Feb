import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { orgData } from "../api/orgData";

// Professional color palette
const colors = {
  primary: "#4f46e5",
  secondary: "#8b5cf6", 
  accent: "#ec4899",
  success: "#10b981",
  warning: "#f59e0b",
  unit: "#6366f1",
  light: "#f8fafc",
  white: "#ffffff",
  gray: "#6b7280"
};

export default function OrgChart({ onSelect, apiRef, filters }) {
  const ref = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomBehaviorRef = useRef();
  const svgSelectionRef = useRef();
  const initialTransformRef = useRef();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Store the container reference for export
    if (apiRef) {
      apiRef.current = {
        exportSVG: () => {
          const svg = d3.select(container).select("svg");
          const svgString = svg.node()?.outerHTML;
          if (svgString) {
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'zorg-organization-chart.svg';
            a.click();
            URL.revokeObjectURL(url);
            return true;
          }
          return false;
        },
        getSVGString: () => {
          const svg = d3.select(container).select("svg");
          return svg.node()?.outerHTML || null;
        }
      };
    }

    // Clear previous content
    d3.select(container).selectAll("*").remove();

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    // Create SVG with professional background
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background", "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)");
    svgSelectionRef.current = svg;

    // Enhanced zoom behavior with better mouse support
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Enhanced mouse wheel scrolling for smooth navigation
    svg.on("wheel", (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      const currentTransform = d3.zoomTransform(svg.node());
      const scale = currentTransform.k;
      
      // Use wheel delta for smooth scrolling
      const scrollSpeed = 0.5;
      const dx = event.deltaX * scrollSpeed;
      const dy = event.deltaY * scrollSpeed;
      
      const newTransform = d3.zoomIdentity
        .translate(currentTransform.x - dx, currentTransform.y - dy)
        .scale(scale);
      
      svg.call(zoom.transform, newTransform);
    }, { passive: false });

    // Enhanced mouse drag behavior
    svg.on("mousedown", () => {
      svg.style("cursor", "grabbing");
    });

    svg.on("mouseup", () => {
      svg.style("cursor", "grab");
    });

    svg.on("mouseleave", () => {
      svg.style("cursor", "grab");
    });

    // Double-click to reset view
    svg.on("dblclick", (event) => {
      event.preventDefault();
      svg.transition()
        .duration(750)
        .call(zoom.transform, initialTransform);
    });

    svg.style("cursor", "grab");

    // Professional positioning for horizontal layout
    const g = svg.append("g").attr("transform", `translate(150, ${height/2})`);

    const applyFiltersToData = (data, f) => {
      if (!f || ((!f.roles || f.roles.length === 0) && (!f.units || f.units.length === 0) && (!f.query || f.query.trim() === ''))) {
        return data;
      }
      const roles = (f.roles || []).map((r) => r.toLowerCase());
      const units = f.units || [];
      const q = (f.query || '').toLowerCase();
      const matches = (n, ancestors) => {
        const roleOK = roles.length === 0 || (n.title && roles.some((r) => (n.title || '').toLowerCase().includes(r)));
        const unitOK = units.length === 0 || ancestors.some((a) => units.includes(a.name));
        const queryOK = !q || (n.name && (n.name || '').toLowerCase().includes(q));
        return roleOK && unitOK && queryOK;
      };
      const helper = (n, ancestors = []) => {
        const childResults = (n.children || []).map((c) => helper(c, [...ancestors, n])).filter(Boolean);
        if (matches(n, ancestors) || childResults.length) {
          const out = { ...n };
          if (childResults.length) out.children = childResults;
          else delete out.children;
          return out;
        }
        return null;
      };
      return helper(data);
    };

    const filteredData = applyFiltersToData(orgData, filters);
    const root = d3.hierarchy(filteredData || { name: 'No results', title: '' });
    
    // ENHANCED HORIZONTAL LAYOUT WITH BETTER GROUPING
    const tree = d3.tree()
      .size([height - 250, width - 300])
      .separation((a, b) => {
        // More spacing for different groups (different parents)
        if (a.parent !== b.parent) return 2.5;
        // Medium spacing for siblings
        if (a.parent === b.parent) return 1.8;
        return 1.5;
      })
      .nodeSize([80, 200]); // Fixed node size for consistent spacing
    tree(root);

    // Calculate bounds and center the tree
    const yExtent = d3.extent(root.descendants(), d => d.y);
    const xExtent = d3.extent(root.descendants(), d => d.x);
    const treeWidth = (yExtent[1] - yExtent[0]) || 1;
    const treeHeight = (xExtent[1] - xExtent[0]) || 1;
    const margin = 150;
    const scale = Math.min(
      (width - margin * 2) / treeWidth,
      (height - margin * 2) / treeHeight
    ) * 0.75;
    const translateX = margin - yExtent[0] * scale;
    const translateY = (height - treeHeight * scale) / 2 - xExtent[0] * scale;
    const initialTransform = d3.zoomIdentity
      .translate(translateX, translateY)
      .scale(scale);
    
    svg.call(zoom.transform, initialTransform);
    initialTransformRef.current = initialTransform;

    // Professional links with enhanced styling
    const defs = svg.append("defs");
    
    const linkGradient = defs.append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 1).attr("y2", 0);
    
    linkGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", colors.primary);
    
    linkGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colors.secondary);

    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#link-gradient)")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
      .attr("opacity", 0.8)
      .style("filter", "drop-shadow(0 3px 12px rgba(79, 70, 229, 0.3))")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      )
      .on("mouseenter", function() {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("stroke-width", 4)
          .attr("opacity", 1)
          .style("filter", "drop-shadow(0 4px 12px rgba(79, 70, 229, 0.4))");
      })
      .on("mouseleave", function() {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("stroke-width", 4)
          .attr("opacity", 0.8)
          .style("filter", "drop-shadow(0 3px 12px rgba(79, 70, 229, 0.3))");
      });

    // Add visual grouping backgrounds for different departments
    const groups = {};
    root.descendants().forEach(d => {
      if (d.parent) {
        const parentName = d.parent.data.name;
        if (!groups[parentName]) {
          groups[parentName] = {
            nodes: [],
            minY: Infinity,
            maxY: -Infinity,
            minX: Infinity,
            maxX: -Infinity
          };
        }
        groups[parentName].nodes.push(d);
        groups[parentName].minY = Math.min(groups[parentName].minY, d.y);
        groups[parentName].maxY = Math.max(groups[parentName].maxY, d.y);
        groups[parentName].minX = Math.min(groups[parentName].minX, d.x);
        groups[parentName].maxX = Math.max(groups[parentName].maxX, d.x);
      }
    });

    // Draw group backgrounds
    Object.entries(groups).forEach(([groupName, group]) => {
      if (group.nodes.length > 1) {
        const padding = 40;
        g.insert("rect", ".node")
          .attr("class", "group-background")
          .attr("x", group.minY - padding)
          .attr("y", group.minX - padding)
          .attr("width", (group.maxY - group.minY) + padding * 2)
          .attr("height", (group.maxX - group.minX) + padding * 2)
          .attr("rx", 16)
          .attr("ry", 16)
          .attr("fill", "rgba(255, 255, 255, 0.95)")
          .attr("stroke", "rgba(0, 0, 0, 0.3)")
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "8,4")
          .style("filter", "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.15))");
        
        // Add group name label
        g.insert("text", ".node")
          .attr("class", "group-label")
          .attr("x", group.minY - padding + 10)
          .attr("y", group.minX - padding + 25)
          .style("font-size", "14px")
          .style("font-weight", "700")
          .style("fill", "#000000")
          .style("text-anchor", "start")
          .text(groupName);
      }
    });

    // Enhanced nodes with professional styling
    const node = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", (d) => {
        const classes = ["node"];
        if (d.children) classes.push("node--internal");
        if (d.data.title === "Unit") classes.push("node--unit");
        if (d.data.title === "Portfolio") classes.push("node--portfolio");
        return classes.join(" ");
      })
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        if (onSelect) onSelect(d.data);
      });

    // Enhanced node backgrounds with different styles for different types
    node
      .append("rect")
      .attr("width", (d) => {
        if (d.data.title === "Unit") return 180;
        if (d.data.title === "Portfolio") return 170;
        return 160;
      })
      .attr("height", (d) => {
        if (d.data.title === "Unit") return 60;
        if (d.data.title === "Portfolio") return 55;
        return 55;
      })
      .attr("x", (d) => {
        if (d.data.title === "Unit") return -90;
        if (d.data.title === "Portfolio") return -85;
        return -80;
      })
      .attr("y", (d) => {
        if (d.data.title === "Unit") return -30;
        if (d.data.title === "Portfolio") return -27.5;
        return -27.5;
      })
      .attr("rx", (d) => {
        if (d.data.title === "Unit") return 12;
        if (d.data.title === "Portfolio") return 10;
        return 8;
      })
      .attr("ry", (d) => {
        if (d.data.title === "Unit") return 12;
        if (d.data.title === "Portfolio") return 10;
        return 8;
      })
      .attr("fill", (d) => {
        if (d.data.title === "Unit") return colors.light;
        if (d.data.title === "Portfolio") return colors.white;
        return colors.white;
      })
      .attr("stroke", (d) => {
        if (d.data.title === "Unit") return colors.unit;
        if (d.data.title === "Portfolio") return colors.primary;
        return colors.gray;
      })
      .attr("stroke-width", (d) => {
        if (d.data.title === "Unit") return 2;
        if (d.data.title === "Portfolio") return 2;
        return 1;
      })
      .style("filter", (d) => {
        if (d.data.title === "Unit") return "drop-shadow(0 4px 12px rgba(99, 102, 241, 0.15))";
        if (d.data.title === "Portfolio") return "drop-shadow(0 4px 12px rgba(236, 72, 153, 0.15))";
        return "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1))";
      });

    // Enhanced role badges
    node
      .append("rect")
      .attr("x", (d) => {
        if (d.data.title === "Unit") return -35;
        if (d.data.title === "Portfolio") return -32;
        return -30;
      })
      .attr("y", (d) => {
        if (d.data.title === "Unit") return -26;
        if (d.data.title === "Portfolio") return -23;
        return -24;
      })
      .attr("width", (d) => {
        if (d.data.title === "Unit") return 70;
        if (d.data.title === "Portfolio") return 64;
        return 60;
      })
      .attr("height", (d) => {
        if (d.data.title === "Unit") return 16;
        if (d.data.title === "Portfolio") return 14;
        return 14;
      })
      .attr("rx", (d) => {
        if (d.data.title === "Unit") return 6;
        if (d.data.title === "Portfolio") return 5;
        return 4;
      })
      .attr("ry", (d) => {
        if (d.data.title === "Unit") return 6;
        if (d.data.title === "Portfolio") return 5;
        return 4;
      })
      .attr("fill", (d) => {
        if (d.data.title === "Unit") return colors.primary;
        if (d.data.title === "Portfolio") return colors.accent;
        return "#e0e7ff";
      });

    node
      .append("text")
      .attr("x", 0)
      .attr("y", (d) => {
        if (d.data.title === "Unit") return -16;
        if (d.data.title === "Portfolio") return -13;
        return -14;
      })
      .attr("text-anchor", "middle")
      .style("font-size", (d) => {
        if (d.data.title === "Unit") return "10px";
        if (d.data.title === "Portfolio") return "9px";
        return "8px";
      })
      .style("font-weight", "600")
      .style("fill", (d) => {
        if (d.data.title === "Unit") return "#000000";
        if (d.data.title === "Portfolio") return "#000000";
        return "#000000";
      })
      .text((d) => {
        const title = d.data.title || 'ORG';
        return title.length > (d.data.title === "Unit" ? 10 : 8) ? 
          title.substring(0, (d.data.title === "Unit" ? 8 : 6)) + '...' : title;
      });

    // Enhanced avatar circles with better positioning
    node
      .append("circle")
      .attr("cx", (d) => {
        if (d.data.title === "Unit") return -65;
        if (d.data.title === "Portfolio") return -60;
        return -55;
      })
      .attr("cy", 0)
      .attr("r", (d) => {
        if (d.data.title === "Unit") return 20;
        if (d.data.title === "Portfolio") return 18;
        return 16;
      })
      .attr("fill", (d) => {
        if (d.data.title === "Unit") return colors.unit;
        if (d.data.title === "Portfolio") return colors.accent;
        // Different colors for different people
        const personColors = [colors.primary, colors.secondary, colors.accent, colors.success, colors.warning];
        const index = d.data.name ? d.data.name.charCodeAt(0) % personColors.length : 0;
        return personColors[index];
      })
      .style("filter", (d) => {
        if (d.data.title === "Unit") return "drop-shadow(0 3px 8px rgba(99, 102, 241, 0.3))";
        if (d.data.title === "Portfolio") return "drop-shadow(0 3px 8px rgba(236, 72, 153, 0.3))";
        return "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))";
      });

    // Professional initials text
    node
      .append("text")
      .attr("x", (d) => {
        if (d.data.title === "Unit") return -65;
        if (d.data.title === "Portfolio") return -60;
        return -55;
      })
      .attr("y", (d) => {
        if (d.data.title === "Unit") return 5;
        if (d.data.title === "Portfolio") return 4;
        return 4;
      })
      .attr("text-anchor", "middle")
      .style("font-weight", "700")
      .style("font-size", (d) => {
        if (d.data.title === "Unit") return "14px";
        if (d.data.title === "Portfolio") return "13px";
        return "11px";
      })
      .style("fill", colors.white)
      .text((d) => {
        if (d.data.title === "Unit") return "U";
        if (d.data.title === "Portfolio") return "P";
        const name = d.data.name || '';
        const parts = name.split(' ');
        if (parts.length >= 2) {
          return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
      });

    // Enhanced name text with better positioning
    node
      .append("text")
      .attr("x", (d) => {
        if (d.data.title === "Unit") return -35;
        if (d.data.title === "Portfolio") return -30;
        return -25;
      })
      .attr("y", (d) => {
        if (d.data.title === "Unit") return 2;
        if (d.data.title === "Portfolio") return 1;
        return 0;
      })
      .attr("text-anchor", "start")
      .style("font-weight", (d) => {
        if (d.data.title === "Unit") return "700";
        if (d.data.title === "Portfolio") return "600";
        return "600";
      })
      .style("font-size", (d) => {
        if (d.data.title === "Unit") return "14px";
        if (d.data.title === "Portfolio") return "13px";
        return "12px";
      })
      .style("fill", (d) => {
        if (d.data.title === "Unit") return "#000000";
        if (d.data.title === "Portfolio") return "#000000";
        return "#000000";
      })
      .text((d) => {
        const name = d.data.name || '';
        const maxLength = d.data.title === "Unit" ? 15 : 12;
        return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
      });

    // Enhanced role/manager text
    node
      .append("text")
      .attr("x", (d) => {
        if (d.data.title === "Unit") return -35;
        if (d.data.title === "Portfolio") return -30;
        return -25;
      })
      .attr("y", (d) => {
        if (d.data.title === "Unit") return 20;
        if (d.data.title === "Portfolio") return 18;
        return 15;
      })
      .attr("text-anchor", "start")
      .style("font-size", (d) => {
        if (d.data.title === "Unit") return "10px";
        if (d.data.title === "Portfolio") return "9px";
        return "9px";
      })
      .style("fill", (d) => {
        if (d.data.title === "Unit") return "#000000";
        if (d.data.title === "Portfolio") return "#000000";
        return "#000000";
      })
      .style("font-style", "italic")
      .text((d) => {
        if (d.data.title === "Unit") return "Unit Leadership";
        if (d.data.title === "Portfolio") return "Portfolio Group";
        if (d.children) {
          return `Manager: ${d.data.name}`;
        } else {
          return `Team Member: ${d.data.name}`;
        }
      });

    // Professional hover effects
    node
      .on("mouseenter", function(event, d) {
        d3.select(this)
          .transition()
          .duration(250)
          .attr("transform", `translate(${d.y},${d.x}) scale(1.03)`);

        d3.select(this).selectAll("rect")
          .transition()
          .duration(250)
          .attr("stroke", (d) => {
            if (d.data.title === "Unit") return colors.secondary;
            if (d.data.title === "Portfolio") return colors.accent;
            return colors.primary;
          })
          .attr("stroke-width", (d) => {
            if (d.data.title === "Unit") return 3;
            if (d.data.title === "Portfolio") return 3;
            return 2;
          })
          .style("filter", (d) => {
            if (d.data.title === "Unit") return "drop-shadow(0 6px 16px rgba(139, 92, 246, 0.3))";
            if (d.data.title === "Portfolio") return "drop-shadow(0 6px 16px rgba(236, 72, 153, 0.3))";
            return "drop-shadow(0 6px 16px rgba(79, 70, 229, 0.3))";
          });
      })
      .on("mouseleave", function(event, d) {
        d3.select(this)
          .transition()
          .duration(250)
          .attr("transform", `translate(${d.y},${d.x}) scale(1)`);

        d3.select(this).selectAll("rect")
          .transition()
          .duration(250)
          .attr("stroke", (d) => {
            if (d.data.title === "Unit") return colors.unit;
            if (d.data.title === "Portfolio") return colors.primary;
            return colors.gray;
          })
          .attr("stroke-width", (d) => {
            if (d.data.title === "Unit") return 2;
            if (d.data.title === "Portfolio") return 2;
            return 1;
          })
          .style("filter", (d) => {
            if (d.data.title === "Unit") return "drop-shadow(0 4px 12px rgba(99, 102, 241, 0.15))";
            if (d.data.title === "Portfolio") return "drop-shadow(0 4px 12px rgba(236, 72, 153, 0.15))";
            return "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1))";
          });
      });

    // Handle window resize
    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      svg.attr("width", newRect.width).attr("height", newRect.height);
    };

    window.addEventListener('resize', handleResize);
    
    if (apiRef) {
      const exportSVG = () => {
        const svgEl = svgSelectionRef.current?.node();
        if (!svgEl) return;
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgEl);
        if (!source.match(/^<svg[^>]+xmlns=/)) {
          source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orgchart.svg';
        a.click();
        URL.revokeObjectURL(url);
      };

      const exportPNG = () => {
        const svgEl = svgSelectionRef.current?.node();
        if (!svgEl) return;
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgEl);
        if (!source.match(/^<svg[^>]+xmlns=/)) {
          source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const vb = svgEl.viewBox && svgEl.viewBox.baseVal ? svgEl.viewBox.baseVal : null;
        const w = vb && vb.width ? vb.width : svgEl.clientWidth || 1200;
        const h = vb && vb.height ? vb.height : svgEl.clientHeight || 800;
        canvas.width = w;
        canvas.height = h;
        img.onload = () => {
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            const a = document.createElement('a');
            a.download = 'orgchart.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
          }
        };
        img.src = url;
      };

      apiRef.current = {
        zoomIn: () => {
          const svgSel = svgSelectionRef.current;
          const zb = zoomBehaviorRef.current;
          if (svgSel && zb) svgSel.transition().duration(300).call(zb.scaleBy, 1.2);
        },
        zoomOut: () => {
          const svgSel = svgSelectionRef.current;
          const zb = zoomBehaviorRef.current;
          if (svgSel && zb) svgSel.transition().duration(300).call(zb.scaleBy, 0.8);
        },
        reset: () => {
          const svgSel = svgSelectionRef.current;
          const zb = zoomBehaviorRef.current;
          if (svgSel && zb) svgSel.transition().duration(300).call(zb.transform, initialTransformRef.current || d3.zoomIdentity);
        },
        exportPNG,
        exportSVG,
        getSVGString: () => {
          const svgEl = svgSelectionRef.current?.node();
          if (!svgEl) return '';
          const serializer = new XMLSerializer();
          let source = serializer.serializeToString(svgEl);
          if (!source.match(/^<svg[^>]+xmlns=/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
          }
          return source;
        },
      };
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (apiRef && apiRef.current) {
        apiRef.current = null;
      }
    };

  }, [onSelect, filters]);

  return (
    <div className="chart-wrapper">
      <div ref={ref} className="chart-container"></div>
      <div className="chart-controls" style={{ justifyContent: 'flex-end' }}>
        <div className="zoom-controls">
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              const svgSel = svgSelectionRef.current;
              const zb = zoomBehaviorRef.current;
              if (svgSel && zb) svgSel.transition().duration(300).call(zb.scaleBy, 0.8);
            }}
          >
            <i className="bi bi-zoom-out"></i> -
          </button>
          <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              const svgSel = svgSelectionRef.current;
              const zb = zoomBehaviorRef.current;
              if (svgSel && zb) svgSel.transition().duration(300).call(zb.scaleBy, 1.2);
            }}
          >
            <i className="bi bi-zoom-in"></i> +
          </button>
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              const svgSel = svgSelectionRef.current;
              const zb = zoomBehaviorRef.current;
              if (svgSel && zb) svgSel.transition().duration(300).call(zb.transform, initialTransformRef.current || d3.zoomIdentity);
            }}
          >
            <i className="bi bi-arrows-fullscreen"></i> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
